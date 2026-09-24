import reportPeriods from "../../../dateUtils/reportPeriods.js";
import { getLastMondayFromCurrentMonth } from "../../../dateUtils/getLastMondayFromCurrentMonth.js";

var getRequiredReportPeriods = (dateFrom, dateTo, needToLoadAllReports) => {
  var dateFromIndex;
  var dateToIndex;

  if (needToLoadAllReports) {
    dateFromIndex = 0;

    var { lastMonday } = getLastMondayFromCurrentMonth();
    dateToIndex = reportPeriods.findIndex((date) => date.dateFrom === lastMonday);
  } else {
    dateFromIndex = reportPeriods.findIndex((date) => date.dateFrom === dateFrom);

    if (dateFromIndex < 0) {
      dateFromIndex = 0;
    }

    dateToIndex = reportPeriods.findIndex((date) => date.dateTo === dateTo);

    if (dateToIndex < 0) {
      var { lastMonday } = getLastMondayFromCurrentMonth();

      dateToIndex = reportPeriods.findIndex((date) => date.dateFrom === lastMonday);
      if (lastMonday > dateTo) {
        dateToIndex -= 1;
      }
    }
  }

  var requiredReportPeriods = reportPeriods.slice(dateFromIndex, dateToIndex + 1);

  return { requiredReportPeriods };
};

export default getRequiredReportPeriods;
