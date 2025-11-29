var dbUtils = require("../../../database/utils");
var { connection } = require("../../../database");
var reportProcessing = require("./reportProcessing");

var MAX_FAILED_ATTEMPTS = 3;
var NEXT_REPORT_DELAY_MS = 90000;
var noDataForPeriodMessage = "there is no data available for the selected reporting period";
var nextReportDelay = async () => new Promise((res) => setTimeout(res, NEXT_REPORT_DELAY_MS));

var loader = async (userId, token) => {
  await dbUtils.setLoadingProgressStatus(userId, "loading");

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
          await reportProcessing(userId, dateFrom, dateTo, token, session);
        } catch (processingError) {
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
