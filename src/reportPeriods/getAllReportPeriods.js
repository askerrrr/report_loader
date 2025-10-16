var getYearMondays = require("./getYearMondays");
var getDateToByDateFrom = require("../periodUtils");

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
  var fullPeriods = requiredMondays.map((monday, index) => {
    var sunday = getDateToByDateFrom(monday);
    return { dateFrom: monday, dateTo: sunday, index };
  });

  return { allPeriods: fullPeriods };
};

module.exports = getAllReportPeriods;
