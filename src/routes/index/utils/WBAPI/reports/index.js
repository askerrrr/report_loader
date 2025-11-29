var { WBAPIError } = require("../../../../../customError");
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

  var [weeklyFinancialReport, paidStorageReport, totalAdvertisingCosts] = await Promise.all([
    getWeeklyFinancialReportFromWBAPI(dateFrom, dateTo, token, userId),
    getPaidStorageReportByTaskIdFromWBAPI(taskId, token, userId),
    getAdvertisingCostsForPeriod(dateFrom, dateTo, token, userId),
  ]);

  if (
    [weeklyFinancialReport, paidStorageReport].every((report) => report.length === 0) &&
    totalAdvertisingCosts === 0
  ) {
    throw new WBAPIError(userId, 404, "Нет отчетов за выбранный период");
  }

  return { weeklyFinancialReport, paidStorageReport, totalAdvertisingCosts };
};

module.exports = getReports;
