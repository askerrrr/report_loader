import checkTokenExpiry from "./checkTokenExpiry.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/utils/index.js";
import reportsProcessing from "./reportsProcessing.js";
import { WBAPIError } from "../../../customError/index.js";

var fiveMinInMs = 300_000;
var MAX_FAILED_ATTEMPTS = 3;
var NEXT_REPORT_DELAY_MS = 65_000;
var statusOfReportLoadingStop = true;
var noDataForPeriodErrMsg = "there is no data available for the selected reporting period";
var nextReportDelay = async (delayMs) => new Promise((res) => (delayMs ? setTimeout(res, delayMs) : setTimeout(res, NEXT_REPORT_DELAY_MS)));

var sessionOptions = { willRetryWrite: false, maxTimeMs: fiveMinInMs };

var loader = async (userId, isServerStartupLoad) => {
  var queueIsEmpty = false;
  var tokenIsExpired = false;
  var isTokenMissing = false;
  var isFirstIterationOfLoop = true;

  if (isServerStartupLoad) {
    await nextReportDelay();
  }

  while (true) {
    var session = await dbClient.startSession();

    try {
      await session.withTransaction(async () => {
        if (isFirstIterationOfLoop) {
          var loadingStatus = 'loading'
          await dbUtils.setLoadingProgressStatus(userId, loadingStatus, session).then(() => console.log("the download has started for the user: " + userId));
          isFirstIterationOfLoop = false;
        }

        var { token } = await dbUtils.getToken(userId, session);

        if (!token) {
          isTokenMissing = true;
          await dbUtils.updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, session);
        } else {
          tokenIsExpired = checkTokenExpiry(token);

          if (tokenIsExpired) {
            await dbUtils.updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, session);
          } else {
            var { report, queueLength } = await dbUtils.getReportsQueue(userId, session);
            if (!report || queueLength < 1) {
              queueIsEmpty = true;
            } else {
              if (queueLength === 1) {
                queueIsEmpty = true;
              }

              var { dateFrom, dateTo, index } = report;

              try {
                var lastLoadedReport = await reportsProcessing(userId, dateFrom, dateTo, token, session);
                lastLoadedReport.periodIndex = index;

                await dbUtils.updateLastLoaderReport(userId, lastLoadedReport, session);
              } catch (processingError) {
                console.log({ processingError });

                if (processingError.message === noDataForPeriodErrMsg) {
                  return;
                } else if (processingError instanceof WBAPIError) {
                  queueIsEmpty = false;

                  await dbUtils.updateReportsQueue(userId, { ...report }, session);
                } else {
                  if (report.failedCount >= MAX_FAILED_ATTEMPTS) {
                    await dbUtils.addReportToAbandonedReports(userId, report, session);
                  } else {
                    queueIsEmpty = false;
                    var failedCount = report.failedCount + 1;
                    await dbUtils.updateReportsQueue(userId, { ...report, failedCount }, session);
                  }
                }
              }
            }
          }
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
      var loadingStatus = 'completed'
      await dbUtils.setLoadingProgressStatus(userId, loadingStatus, session).then(() => console.log("LOADING COMPLETED"));
      break
    }

    if (isTokenMissing || tokenIsExpired || queueIsEmpty) {
      break;
    }

    await nextReportDelay();
  }
};

export default loader;
