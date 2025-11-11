var getDateToByDateFrom = require("./getDateToByDateFrom");

var getFullPeriods = (mondays) =>
  mondays.map((monday, index) => {
    var sunday = getDateToByDateFrom(monday);
    return { dateFrom: monday, dateTo: sunday, index, failedCount: 0 };
  });

module.exports = getFullPeriods;
