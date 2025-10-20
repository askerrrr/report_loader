var dbUtils = require("../../../database/utils");
var reportProcessing = require("./reportProcessing");

var NEXT_REPORT_DELAY_MS = 65000;

var failedLoader = async (userId, token) => {
  var ignition = 1;

  await dbUtils.setLoadingProgressStatus(userId, "loading");

  while (ignition) {
    try {
      var { failedReportsQueue } = await dbUtils.getFailedReportsQueue(userId);
      ignition = failedReportsQueue.length - 1;
      var reportToUpload = failedReportsQueue.shift();

      var { dateFrom, dateTo } = reportToUpload;

      await reportProcessing(userId, dateFrom, dateTo, token);

      console.log({ reportToUpload });

      await dbUtils.updateFailedReportsQueue(userId, failedReportsQueue);
    } catch (e) {
      if (reportToUpload.failedCount === 4) {
        await dbUtils.addReportToAbandonedReports(userId, reportToUpload);
        await dbUtils.updateFailedReportsQueue(userId, failedReportsQueue);
      } else {
        reportToUpload.failedCount += 1;

        await dbUtils.addReportToFailedQueue(userId, reportToUpload);
      }
    }

    await new Promise((res) => setTimeout(res, NEXT_REPORT_DELAY_MS));
  }

  await dbUtils.setLoadingProgressStatus(userId, "completed");
};

module.exports = failedLoader;
