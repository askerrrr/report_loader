var dbUtils = require("../../../database/utils");
var reportProcessing = require("./reportProcessing");

var NEXT_REPORT_DELAY_MS = 65000;

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

      console.log({ reportToUpload });

      await dbUtils.updateReportsQueue(userId, reportsQueue);
    } catch (e) {
      reportToUpload.failedCount = 1;

      await dbUtils.addReportToFailedQueue(userId, reportToUpload);
      await dbUtils.updateReportsQueue(userId, reportsQueue);
    }

    await new Promise((res) => setTimeout(res, NEXT_REPORT_DELAY_MS));
  }

  await dbUtils.setLoadingProgressStatus(userId, "completed");
};

module.exports = loader;
