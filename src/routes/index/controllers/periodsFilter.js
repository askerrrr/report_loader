import dbUtils from "../../../database/utils/index.js";
import reportPeriods from "../../../dateUtils/reportPeriods.js";
import filteringOfRequiredReportPeriods from "../utils/filteringOfRequiredReportPeriods.js";
import { getLastMondayFromCurrentMonth } from "../../../dateUtils/getLastMondayFromCurrentMonth.js";

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
      if (lastMonday > dateTo) {
        dateToIndex -= 1;
      }
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
    reportTree,
  );

  if (!filteredRequiredReportPeriods.length) {
    return res.status(409).json({ msg: "Отчёты за выбранный период уже есть" });
  }

  if (abandonedReportsAddedToQueue) {
    await dbUtils.resetAbandonedReports(userId);
  }

  req.body.userId = userId;
  req.body.filteredRequiredReportPeriods = filteredRequiredReportPeriods;

  next();
};

export default periodsFilter;
