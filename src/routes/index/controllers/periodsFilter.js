import dbUtils from "../../../database/utils/index.js";
import reportPeriods from "../../../dateUtils/reportPeriods.js";
import filteringOfRequiredReportPeriods from "../utils/filteringOfRequiredReportPeriods.js";
import { getLastMondayFromCurrentMonth } from "../../../dateUtils/getLastMondayFromCurrentMonth.js";

var periodsFilter = async (req, res, next) => {
  var { userId, dateFrom, dateTo, needToLoadAllReports } = req.body;

  var dateFromIndex;
  var dateToIndex;

  if (needToLoadAllReports) {
    dateFromIndex = 0;

    var { lastMonday } = getLastMondayFromCurrentMonth();
    dateToIndex = reportPeriods.findIndex(
      (date) => date.dateFrom === lastMonday,
    );
  } else {
    dateFromIndex = reportPeriods.findIndex(
      (date) => date.dateFrom === dateFrom,
    );

    if (dateFromIndex < 0) {
      dateFromIndex = 0;
    }

    dateToIndex = reportPeriods.findIndex((date) => date.dateTo === dateTo);

    if (dateToIndex < 0) {
      var { lastMonday } = getLastMondayFromCurrentMonth();

      dateToIndex = reportPeriods.findIndex(
        (date) => date.dateFrom === lastMonday,
      );
      if (lastMonday > dateTo) {
        dateToIndex -= 1;
      }
    }
  }

  var requiredReportPeriods = reportPeriods.slice(
    dateFromIndex,
    dateToIndex + 1,
  );

  var userLoadingsState = await dbUtils.getUserReportLoadingState(userId);

  var savedReportPeriodsFromDb = (await dbUtils.getReportPeriods(userId))
    .reportPeriods;

  var { filteredRequiredReportPeriods, abandonedReportsAddedToQueue } =
    filteringOfRequiredReportPeriods(
      userLoadingsState,
      requiredReportPeriods,
      savedReportPeriodsFromDb,
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
