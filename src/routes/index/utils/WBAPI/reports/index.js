var { WBAPIError } = require("../../../../../customError");
var createPaidStorageReportTask = require("./createPaidStorageReportTask");
var getAdvertisingCostsForPeriod = require("./getAdvertisingCostsForPeriod");
var getWeeklyFinancialReportFromWBAPI = require("./getWeeklyFinancialReportFromWBAPI");
var checkPaidStorageReportCreationStatus = require("./checkPaidStorageReportCreationStatus");
var getPaidStorageReportByTaskIdFromWBAPI = require("./getPaidStorageReportByTaskIdFromWBAPI");

var noDataForPeriodMessage = "there is no data available for the selected reporting period";

var getReports = async (userId, dateFrom, dateTo, token) => {
  var { taskId } = await createPaidStorageReportTask(dateFrom, dateTo, token, userId);
  var { statusIsDone } = await checkPaidStorageReportCreationStatus(taskId, token, userId);

  if (!statusIsDone) {
    throw new WBAPIError(userId, 304, "can not create paid storage report task");
  }

  var [weeklyFinancialReport, paidStorageReport, totalAdvertisingCosts] = await Promise.all([
    getWeeklyFinancialReportFromWBAPI(dateFrom, dateTo, token, userId),
    getPaidStorageReportByTaskIdFromWBAPI(taskId, token, userId),
    getAdvertisingCostsForPeriod(dateFrom, dateTo, token, userId),
  ]);

  if ([weeklyFinancialReport, paidStorageReport, totalAdvertisingCosts].every(() => !i.length)) {
    throw new Error(noDataForPeriodMessage);
  }

  return { weeklyFinancialReport, paidStorageReport, totalAdvertisingCosts };
};

module.exports = getReports;
