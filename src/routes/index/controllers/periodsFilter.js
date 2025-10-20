var reportPeriods = require("../../../dateUtils/reportPeriods");
var filterExistRequiredReportPeriods = require("../utils/filterExistRequiredReportPeriods");

var periodsFilter = async (req, res, next) => {
  var db = req.app.locals.db;
  var { userId, dateFrom, dateTo } = req.body;

  var dateFromIndex = reportPeriods.findIndex((date) => date.dateFrom === dateFrom);
  var dateToIndex = reportPeriods.findIndex((date) => date.dateTo === dateTo);

  var requireddateUtils = dateUtils.slice(dateFromIndex, dateToIndex + 1);
  var { reportsQueue } = await db.getReportsQueue(userId);

  var { filteredRequireddateUtils } = filterExistRequiredReportPeriods(requireddateUtils, reportsQueue);

  req.body = { userId, filteredRequireddateUtils };
  next();
};

module.exports = periodsFilter;
