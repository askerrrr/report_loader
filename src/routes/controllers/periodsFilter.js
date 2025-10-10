var reportPeriods = require("../../reportPeriods/reportPeriods");
var filterExistRequiredReportPeriods = require("../utils/filterExistRequiredReportPeriods");

var periodsFilter = async (req, res, next) => {
  var db = req.app.locals.db;
  var { userId, dateFrom, dateTo } = req.body;
  var dateFromIndex = reportPeriods.findIndex((date) => date.dateFrom === dateFrom);
  var dateToIndex = reportPeriods.findIndex((date) => date.dateTo === dateTo);

  var requiredReportPeriods = reportPeriods.slice(dateFromIndex, dateToIndex + 1);
  var { reportsQueue } = await db.getReportsQueue(userId);

  //checkReportExist(userId)

  var { filteredRequiredReportPeriods } = filterExistRequiredReportPeriods(requiredReportPeriods, reportsQueue);

  req.body = { userId, filteredRequiredReportPeriods };
  next();
};

module.exports = periodsFilter;
