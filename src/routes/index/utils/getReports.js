var getReportByPeriodFromWBAPI = require("./getReportByPeriodFromWBAPI");
var createPaidStorageReportTask = require("./createPaidStorageReportTask");
var getAdvertisingCostsForPeriod = require("./getAdvertisingCostsForPeriod");
var checkPaidStorageReportCreationStatus = require("./checkPaidStorageReportCreationStatus");
var getPaidStorageReportByTaskIdFromWBAPI = require("./getPaidStorageReportByTaskIdFromWBAPI");

var getReports = async (userId, dateFrom, dateTo, token) => {
  var { taskId } = await createPaidStorageReportTask(dateFrom, dateTo, token, userId);

  var statusIsDone = await checkPaidStorageReportCreationStatus(taskId, token);

  var [mainReport, paidStorageReport, totalAdvertisingCosts] = await Promise.all([
    getReportByPeriodFromWBAPI(dateFrom, dateTo, token, userId),
    getPaidStorageReportByTaskIdFromWBAPI(taskId, token, userId),
    getAdvertisingCostsForPeriod(dateFrom, dateTo, token, userId),
  ]);

  if (!statusIsDone) {
    throw new Error("can not create paid storage report task");
  }

  return { mainReport, paidStorageReport, totalAdvertisingCosts };
};

module.exports = getReports;
