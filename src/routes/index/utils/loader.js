import parseJwt from "./parseJwt.js";
import checkTokenExpiry from "./checkTokenExpiry.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/utils/index.js";
import reportsProcessing from "./reportsProcessing.js";
import { WBAPIError } from "../../../customError/index.js";
import { logger, errorLogger } from "../../../logger.js";
import isLastRequestTooRecent from "./isLastRequestTooRecent.js";

var MAX_FAILED_ATTEMPTS = 3;
var FIVE_MIN_IN_MS = 300_000;
var NEXT_REPORT_DELAY_MS = 65_000;
var statusOfReportLoadingStop = true;
var queueLengthNeedsIncrement = true;
var nextReportDelay = async (delayMs) =>
  new Promise((res) =>
    delayMs ? setTimeout(res, delayMs) : setTimeout(res, NEXT_REPORT_DELAY_MS),
  );

var sessionOptions = { willRetryWrite: false, maxTimeMs: FIVE_MIN_IN_MS };

var loader = async (userId, isServerStartupLoad = false) => {
  var queueIsEmpty = false;
  var tokenIsExpired = false;
  var isTokenMissing = false;
  var loadingStopReason = "";
  var isFirstIterationOfLoop = true;

  if (isServerStartupLoad) {
    await nextReportDelay();
  }

  while (true) {
    var dateFrom;
    var dateTo;
    var loadingStatus;

    var session = await dbClient.startSession();

    try {
      await session.withTransaction(async () => {
        if (isFirstIterationOfLoop) {
          isFirstIterationOfLoop = false;

          loadingStatus = "loading";
          logger.info({ userId, loadingStatus });

          await dbUtils.setLoadingProgressStatus(
            userId,
            loadingStatus,
            session,
          );
        }

        var { token } = await dbUtils.getToken(userId, session);

        if (!token) {
          isTokenMissing = true;
          loadingStopReason = "isTokenMissing";
          await dbUtils.updateReportLoadingStoppedStatus(
            userId,
            statusOfReportLoadingStop,
            loadingStopReason,
            session,
          );
        } else {
          var tokenPayload = parseJwt(token);
          tokenIsExpired = checkTokenExpiry(tokenPayload).isExpired;

          if (tokenIsExpired) {
            loadingStopReason = "tokenIsExpired";
            await dbUtils.updateReportLoadingStoppedStatus(
              userId,
              statusOfReportLoadingStop,
              loadingStopReason,
              session,
            );
          } else {
            var {
              report,
              queueLength,
              loadingInProgress,
              lastReportRequestTimestamp,
            } = await dbUtils.getReportsQueue(userId, session);

            if (!report || queueLength < 1 || !loadingInProgress) {
              queueIsEmpty = true;
            } else {
              if (queueLength === 1) {
                queueIsEmpty = true;
              }

              try {
                var { needToDelay, delayInMs } = isLastRequestTooRecent(
                  lastReportRequestTimestamp,
                  NEXT_REPORT_DELAY_MS,
                );

                if (needToDelay) {
                  await nextReportDelay(delayInMs);
                }

                dateFrom = report.dateFrom;
                dateTo = report.dateTo;

                var { lastLoadedReport, reportPeriodIsEmpty } =
                  await reportsProcessing(
                    userId,
                    dateFrom,
                    dateTo,
                    token,
                    session,
                  );

                if (!reportPeriodIsEmpty) {
                  await dbUtils.updateLastLoadedReport(
                    userId,
                    lastLoadedReport,
                    session,
                  );
                } else {
                  await dbUtils.addReportToEmptyReportPeriods(
                    userId,
                    dateFrom,
                    dateTo,
                    session,
                  );
                }
              } catch (err) {
                errorLogger.info({ userId, dateFrom, dateTo, err });

                if (err instanceof WBAPIError) {
                  queueIsEmpty = false;

                  await dbUtils.updateReportsQueue(
                    userId,
                    { ...report },
                    queueLengthNeedsIncrement,
                    session,
                  );
                } else {
                  if (report.failedCount >= MAX_FAILED_ATTEMPTS) {
                    await dbUtils.addReportToAbandonedReports(
                      userId,
                      report,
                      session,
                    );
                  } else {
                    queueIsEmpty = false;
                    var failedCount = report.failedCount + 1;
                    await dbUtils.updateReportsQueue(
                      userId,
                      { ...report, failedCount },
                      queueLengthNeedsIncrement,
                      session,
                    );
                  }
                }
              }
            }
          }
        }

        if (queueIsEmpty) {
          loadingStatus = "completed";

          await dbUtils.setLoadingProgressStatus(
            userId,
            loadingStatus,
            session,
          );
        }
      }, sessionOptions);
    } catch (err) {
      errorLogger.info({ userId, dateFrom, dateTo, err });

      queueIsEmpty = false;
    } finally {
      if (session) {
        if (session?.inTransaction()) {
          await session.endSession();
        }
      }
    }

    if (queueIsEmpty || isTokenMissing || tokenIsExpired) {
      logger.info({
        userId,
        loadingStatus,
        queueIsEmpty,
        isTokenMissing,
        tokenIsExpired,
      });

      break;
    }

    await nextReportDelay();
  }
};

export default loader;
