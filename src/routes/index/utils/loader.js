import checkTokenExpiry from "./checkTokenExpiry.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/utils/index.js";
import reportsProcessing from "./reportsProcessing.js";
import { WBAPIError } from "../../../customError/index.js";
import isLastRequestTooRecent from "./isLastRequestTooRecent.js";

var fiveMinInMs = 300_000;
var MAX_FAILED_ATTEMPTS = 3;
var NEXT_REPORT_DELAY_MS = 65_000;
var statusOfReportLoadingStop = true;
var queueLengthNeedsIncrement = true;
var nextReportDelay = async (delayMs) => new Promise((res) => (delayMs ? setTimeout(res, delayMs) : setTimeout(res, NEXT_REPORT_DELAY_MS)));

var sessionOptions = { willRetryWrite: false, maxTimeMs: fiveMinInMs };

var loader = async (userId, isServerStartupLoad = false) => {
  var queueIsEmpty = false;
  var tokenIsExpired = false;
  var isTokenMissing = false;
  var loadingStopReason = "";
  var isFirstIterationOfLoop = true;

  if (isServerStartupLoad) {
    console.log("\n--- SERVER STARTUP DELAY ---\n");
    await nextReportDelay();
  }

  while (true) {
    var session = await dbClient.startSession();

    if (isFirstIterationOfLoop) {
      var loadingStatus = "loading";
      isFirstIterationOfLoop = false;
      await dbUtils.setLoadingProgressStatus(userId, loadingStatus, session);
    }

    try {
      await session.withTransaction(async () => {
        var { token } = await dbUtils.getToken(userId, session);

        if (!token) {
          isTokenMissing = true;
          loadingStopReason = "isTokenMissing";
          await dbUtils.updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason, session);
        } else {
          tokenIsExpired = checkTokenExpiry(token);

          if (tokenIsExpired) {
            loadingStopReason = "tokenIsExpired";
            await dbUtils.updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason, session);
          } else {
            var { report, queueLength, lastReportRequestTimestamp } = await dbUtils.getReportsQueue(userId, session);

            if (!report || queueLength < 1) {
              queueIsEmpty = true;
            } else {
              if (queueLength === 1) {
                queueIsEmpty = true;
              }

              var { dateFrom, dateTo, index } = report;

              try {
                var { needToDalay, delayInMs } = isLastRequestTooRecent(lastReportRequestTimestamp, NEXT_REPORT_DELAY_MS);
                console.log({ needToDalay, delayInMs });
                if (needToDalay) {
                  await nextReportDelay(delayInMs);
                }

                var { lastLoadedReport, reportPeriodIsEmpty } = await reportsProcessing(userId, dateFrom, dateTo, token, session);

                if (!reportPeriodIsEmpty) {
                  lastLoadedReport.periodIndex = index;
                  await dbUtils.updateLastLoaderReport(userId, lastLoadedReport, session);
                } else {
                  await dbUtils.addReportToEmptyReportPeriods(userId, index, dateFrom, dateTo, session);
                }
              } catch (processingError) {
                console.log({ processingError });

                if (processingError instanceof WBAPIError) {
                  queueIsEmpty = false;

                  await dbUtils.updateReportsQueue(userId, { ...report }, queueLengthNeedsIncrement, session);
                } else {
                  if (report.failedCount >= MAX_FAILED_ATTEMPTS) {
                    await dbUtils.addReportToAbandonedReports(userId, report, session);
                  } else {
                    queueIsEmpty = false;
                    var failedCount = report.failedCount + 1;
                    await dbUtils.updateReportsQueue(userId, { ...report, failedCount }, queueLengthNeedsIncrement, session);
                  }
                }
              }
            }
          }
        }

        if (queueIsEmpty) {
          var loadingStatus = "completed";
          await dbUtils.setLoadingProgressStatus(userId, loadingStatus, session);
        }
      }, sessionOptions);
    } catch (err) {
      queueIsEmpty = false;

      console.error({ loadingError: err });
    } finally {
      if (session?.inTransaction()) {
        await session.endSession();
      }
    }

    if (queueIsEmpty) {
      break;
    }

    if (isTokenMissing || tokenIsExpired) {
      console.log("LOADING IS STOPPED.\nREASON: " + loadingStopReason);
      break;
    }

    await nextReportDelay();
  }
};

export default loader;
