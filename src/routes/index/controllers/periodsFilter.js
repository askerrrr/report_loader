var reportPeriods = require("../../../dateUtils/reportPeriods");
var filteringOfRequiredReportPeriods = require("../utils/filteringOfRequiredReportPeriods");
var { getLastMondayFromCurrentMonth } = require("../../../dateUtils/getLastMondayFromCurrentMonth");
var dbUtils = require("../../../database/utils");

var periodsFilter = async (req, res, next) => {
  var db = req.app.locals.db;
  var { userId, dateFrom, dateTo } = req.body;

  var { reportsQueue } = await dbUtils.getReportsQueue(userId);

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

  var userLoadingsStates = await db.getUser(userId);

  var { reportTree } = await db.getReportsTree(userId);

  var { filteredRequiredReportPeriods } = filteringOfRequiredReportPeriods(userLoadingsStates, requiredReportPeriods, reportTree);

  if (!filteredRequiredReportPeriods.length) {
    return res.status(409).json({ msg: "Отчёты за выбранный период уже есть" });
  }

  req.body = { userId, filteredRequiredReportPeriods };
  next();
};

module.exports = periodsFilter;
