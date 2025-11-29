var dbUtils = require("../../../database/utils");
var reportPeriods = require("../../../dateUtils/reportPeriods");
var filteringOfRequiredReportPeriods = require("../utils/filteringOfRequiredReportPeriods");
var { getLastMondayFromCurrentMonth } = require("../../../dateUtils/getLastMondayFromCurrentMonth");

var periodsFilter = async (req, res, next) => {
  var { userId, dateFrom, dateTo } = req.body;

  var dateFromIndex = reportPeriods.findIndex((date) => date.dateFrom === dateFrom);
  var dateToIndex = reportPeriods.findIndex((date) => date.dateTo === dateTo);

  var requiredReportPeriods;

  if (![dateFromIndex, dateToIndex].every((index) => index >= 0)) {
    if (dateFromIndex < 0) {
      dateFromIndex = 0;
    }

    if (dateToIndex < 0) {
      var { lastMonday } = getLastMondayFromCurrentMonth();
      var dateToIndex = reportPeriods.findIndex((date) => date.dateFrom === lastMonday);
    }

    requiredReportPeriods = reportPeriods.slice(dateFromIndex, dateToIndex + 1);
  } else {
    requiredReportPeriods = reportPeriods.slice(dateFromIndex, dateToIndex + 1);
  }

  var userLoadingsStates = await dbUtils.getUser(userId);

  var { reportTree } = await dbUtils.getReportsTree(userId);

  var { filteredRequiredReportPeriods, abandonedReportsAddedToQueue } = filteringOfRequiredReportPeriods(
    userLoadingsStates,
    requiredReportPeriods,
    reportTree
  );

  if (!filteredRequiredReportPeriods.length) {
    return res.status(409).json({ msg: "Отчёты за выбранный период уже есть" });
  }

  if (abandonedReportsAddedToQueue) {
    await dbUtils.resetAbandonedReports(userId);
  }

  req.body = { userId, filteredRequiredReportPeriods };
  next();
};

module.exports = periodsFilter;
