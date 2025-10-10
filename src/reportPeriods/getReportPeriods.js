var getLastMondayByDateTo = require("./getLastMondayByDateTo");

var getReportPeriods = async (dateFrom, dateTo) => {
  if (!dateFrom) {
    dateFrom = "2024-01-29";
  }

  var { lastMonday } = getLastMondayByDateTo(dateTo);
  var startYear = +dateFrom.split("-")[0];
  var endYear = +lastMonday.split("-")[0];

  if (startYear === endYear) {
    var mondays = await getYearMondays(dateFrom);
    var firstMondayIndex = mondays.findIndex((monday) => monday === dateFrom);
    var lastMondayIndex = mondays.findIndex((monday) => monday === lastMonday);
    var requiredMondays = mondays.slice(firstMondayIndex, lastMondayIndex + 1);
    return { requiredMondays };
  }

  var mondays = [];

  for (var i = startYear; i <= endYear; i++) {
    var date = `${i}-01-15`;
    var yearMondays = getYearMondays(date);
    mondays.push(...yearMondays);
  }

  var firstMondayIndex = mondays.findIndex((monday) => monday === dateFrom);
  var lastMondayIndex = mondays.findIndex((monday) => monday === lastMonday);
  var requiredMondays = mondays.slice(firstMondayIndex, lastMondayIndex + 1);
  var fullPeriods = await Promise.all(
    requiredMondays.map((monday) => {
      var sunday = getDateToByDateFrom(monday);
      return { dateFrom: monday, dateTo: sunday };
    })
  );

  return { fullPeriods };
};
