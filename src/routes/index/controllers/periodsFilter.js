var reportPeriods = require("../../../dateUtils/reportPeriods");
var filteringOfRequiredReportPeriods = require("../utils/filteringOfRequiredReportPeriods");

var periodsFilter = async (req, res, next) => {
  var db = req.app.locals.db;
  var { userId, dateFrom, dateTo } = req.body;

  var dateFromIndex = reportPeriods.findIndex((date) => date.dateFrom === dateFrom);
  var dateToIndex = reportPeriods.findIndex((date) => date.dateTo === dateTo);

  var requiredReportPeriods = report.slice(dateFromIndex, dateToIndex + 1);
  var userLoadingsStates = await db.getUser(userId);

  var { filteredRequiredReportPeriods } = filteringOfRequiredReportPeriods(userLoadingsStates, requiredReportPeriods);

  req.body = { userId, filteredRequiredReportPeriods };
  next();
};

module.exports = periodsFilter;
