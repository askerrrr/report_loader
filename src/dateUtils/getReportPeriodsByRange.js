import getYearMondays from "./getYearMondays.js";
import getFullPeriods from "./getFullPeriods.js";
import getLastMondayByDateTo from "./getLastMondayByDateTo.js";

var getReportPeriodsByRange = async (dateFrom, dateTo) => {
  if (!dateFrom) {
    dateFrom = "2024-01-29";
  }

  var { lastMonday } = getLastMondayByDateTo(dateTo);

  var startYear = +dateFrom.split("-")[0];
  var endYear = +lastMonday.split("-")[0];

  if (startYear === endYear) {
    var { yearMondays } = getYearMondays(dateFrom);
    var firstMondayIndex = yearMondays.findIndex((monday) => monday === dateFrom);
    var lastMondayIndex = yearMondays.findIndex((monday) => monday === lastMonday);
    var requiredMondays = yearMondays.slice(firstMondayIndex, lastMondayIndex + 1);
    var fullPeriods = getFullPeriods(requiredMondays);
    return { fullPeriods };
  }

  var mondays = [];

  for (var i = startYear; i <= endYear; i++) {
    var date = `${i}-01-15`;
    var { yearMondays } = getYearMondays(date);
    mondays.push(...yearMondays);
  }

  var firstMondayIndex = mondays.findIndex((monday) => monday === dateFrom);
  var lastMondayIndex = mondays.findIndex((monday) => monday === lastMonday);
  var requiredMondays = mondays.slice(firstMondayIndex, lastMondayIndex + 1);
  var fullPeriods = getFullPeriods(requiredMondays);
  return { fullPeriods };
};

export default getReportPeriodsByRange;
