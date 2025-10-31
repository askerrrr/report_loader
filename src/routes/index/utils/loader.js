var dbUtils = require("../../../database/utils");
var reportProcessing = require("./reportProcessing");

var MAX_FAILED_ATTEMPTS = 3;
var NEXT_REPORT_DELAY_MS = 65000;
var nextReportDelay = async () => new Promise((res) => setTimeout(res, NEXT_REPORT_DELAY_MS));

var loader = async (userId, token) => {
  var ignition = 1;

  await dbUtils.setLoadingProgressStatus(userId, "loading");

  while (ignition) {
    try {
      var { reportsQueue } = await dbUtils.getReportsQueue(userId);
      ignition = reportsQueue.length - 1;
      var reportToUpload = reportsQueue.shift();

      var { dateFrom, dateTo } = reportToUpload;

      await reportProcessing(userId, dateFrom, dateTo, token);
      await dbUtils.updateReportsQueue(userId, reportsQueue);
    } catch (e) {
      if (e.message === "there is no data available for the selected reporting period") {
        await nextReportDelay();
        continue;
      }

      if (reportToUpload.failedCount === MAX_FAILED_ATTEMPTS) {
        await dbUtils.addReportToAbandonedReports(userId, reportToUpload);
      } else {
        ignition += 1;
        reportToUpload.failedCount += 1;
        reportsQueue.push(reportToUpload);
        await dbUtils.updateReportsQueue(userId, reportsQueue);
      }
    }

    await nextReportDelay();
  }

  console.log("LOADING COMPLETED");
  await dbUtils.setLoadingProgressStatus(userId, "completed");
};

module.exports = loader;
