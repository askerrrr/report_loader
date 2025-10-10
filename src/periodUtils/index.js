var truncateDate = require("./services/truncateDate.js");
var getNextPeriod = require("./services/getNextPeriod.js");
var hasPeriodOverlap = require("./services/hasPeriodOverlap.js");
var { getWeekDaysFromMonth } = require("./services/getWeekDaysFromMonth.js");

var getDateToByDateFrom = (dateFrom) => {
  var [year, month, day] = dateFrom.split("-").map(Number);

  var sundays, dateTo;

  var overlap = hasPeriodOverlap(year, month, day);

  if (overlap) {
    var nextPeriod = getNextPeriod(year, month);
    sundays = getWeekDaysFromMonth(nextPeriod, "sunday");

    var firstSandayIndex = 0;

    dateTo = sundays[firstSandayIndex];

    var trancatedDate = truncateDate(dateTo);

    return trancatedDate;
  }

  var mondays = getWeekDaysFromMonth(dateFrom, "monday");
  var dateFromISO = new Date(dateFrom).toISOString();
  var mondayIndex = mondays.indexOf(dateFromISO);

  sundays = getWeekDaysFromMonth(dateFrom, "sunday");

  var sandayIndex = ++mondayIndex;

  dateTo = sundays[sandayIndex];

  var trancatedDate = truncateDate(dateTo);

  return trancatedDate;
};

module.exports = getDateToByDateFrom;
