import getYearMondays from "./getYearMondays.js";
import getFullPeriods from "./getFullPeriods.js";

var getAllReportPeriods = () => {
  var mondays = [];
  var startYear = 2024;
  var endYear = 2035;

  for (var i = startYear; i <= endYear; i++) {
    var date = `${i}-01-15`;
    var { yearMondays } = getYearMondays(date);
    mondays.push(...yearMondays);
  }

  var indexOfDateFrom = 4;
  var requiredMondays = mondays.slice(indexOfDateFrom);
  var fullPeriods = getFullPeriods(requiredMondays);

  return { allPeriods: fullPeriods };
};

export default getAllReportPeriods;
