var dbUtils = require("../../../database/utils");
var { connection } = require("../../../database");
var reportsProcessing = require("./reportsProcessing");

var MAX_FAILED_ATTEMPTS = 3;
var NEXT_REPORT_DELAY_MS = 65000;
var noDataForPeriodMessage = "there is no data available for the selected reporting period";
var nextReportDelay = async (delayMs) => new Promise((res) => (delayMs ? setTimeout(res, delayMs) : setTimeout(res, NEXT_REPORT_DELAY_MS)));

var loader = async (userId, token) => {
  await dbUtils.setLoadingProgressStatus(userId, "loading").then(() => console.log("the download has started for the user: " + userId));

  while (true) {
    try {
      var queueIsEmpty = false;
      var session = await connection.startSession();

      await session.withTransaction(async () => {
        var { report, queueLength } = await dbUtils.getReportsQueue(userId, session);

        if (!report) {
          throw new Error("QUEUE_EMPTY");
        }

        if (queueLength === 1) {
          queueIsEmpty = true;
        }

        var { dateFrom, dateTo } = report;

        try {
          await reportsProcessing(userId, dateFrom, dateTo, token, session);
        } catch (processingError) {
          console.log({ processingError });
          if (processingError.message === noDataForPeriodMessage) {
            return;
          } else {
            if (report.failedCount >= MAX_FAILED_ATTEMPTS) {
              await dbUtils.addReportToAbandonedReports(userId, report, session);
            } else {
              var failedCount = report.failedCount + 1;
              await dbUtils.updateReportsQueue(userId, { ...report, failedCount }, session);
            }
          }
        }
      });
    } catch (err) {
      console.log({ err });
      if (err.message === "QUEUE_EMPTY") {
        break;
      }

      console.error({ loadingError: err });
    } finally {
      if (session) {
        await session.endSession();
      }
    }

    if (!queueIsEmpty) {
      await nextReportDelay();
    }
  }

  await dbUtils.setLoadingProgressStatus(userId, "completed").then(() => console.log("LOADING COMPLETED"));
};

module.exports = loader;
