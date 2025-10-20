var { WBAPIError } = require("../../../../customError");
var getWeeklyFinancialReportFromWBAPI = require("./getWeeklyFinancialReportFromWBAPI");
var createPaidStorageReportTask = require("./createPaidStorageReportTask");
var getAdvertisingCostsForPeriod = require("./getAdvertisingCostsForPeriod");
var checkPaidStorageReportCreationStatus = require("./checkPaidStorageReportCreationStatus");
var getPaidStorageReportByTaskIdFromWBAPI = require("./getPaidStorageReportByTaskIdFromWBAPI");

var getReports = async (userId, dateFrom, dateTo, token) => {
  var { taskId } = await createPaidStorageReportTask(dateFrom, dateTo, token, userId);

  var statusIsDone = await checkPaidStorageReportCreationStatus(taskId, token, userId);

  if (!statusIsDone) {
    throw new WBAPIError(userId, 304, "can not create paid storage report task");
  }

  var [mainReport, paidStorageReport, totalAdvertisingCosts] = await Promise.all([
    getWeeklyFinancialReportFromWBAPI(dateFrom, dateTo, token, userId),
    getPaidStorageReportByTaskIdFromWBAPI(taskId, token, userId),
    getAdvertisingCostsForPeriod(dateFrom, dateTo, token, userId),
  ]);

  return { mainReport, paidStorageReport, totalAdvertisingCosts };
};

module.exports = getReports;
