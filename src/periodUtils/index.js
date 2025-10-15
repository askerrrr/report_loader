var truncateDate = require("./services/truncateDate.js");
var getNextPeriod = require("./services/getNextPeriod.js");
var hasPeriodOverlap = require("./services/hasPeriodOverlap.js");
var { getWeekDaysFromMonth } = require("./services/getWeekDaysFromMonth.js");

var getDateToByDateFrom = (dateFrom) => {
  try {
    var [year, month, day] = dateFrom.split("-").map(Number);

    var sundays, dateTo;

    var overlap = hasPeriodOverlap(year, month, day);

    if (overlap) {
      var nextPeriod = getNextPeriod(year, month);
      sundays = getWeekDaysFromMonth(nextPeriod, "sunday");

      var firstSundayIndex = 0;

      dateTo = sundays[firstSundayIndex];

      var trancatedDate = truncateDate(dateTo);

      return trancatedDate;
    }

    var mondays = getWeekDaysFromMonth(dateFrom, "monday");

    var dateFromISO = new Date(dateFrom).toISOString();
    var mondayIndex = mondays.indexOf(dateFromISO);

    sundays = getWeekDaysFromMonth(dateFrom, "sunday");

    var sundayIndex = mondayIndex + 1;

    if (sundayIndex === sundays.length) {
      sundayIndex--;
    }
    dateTo = sundays[sundayIndex];

    var trancatedDate = truncateDate(dateTo);
  } catch (e) {
    console.log({ dateFrom, date: new Date(dateFrom), dateTo, mondays, sundays, mondayIndex, sundayIndex, e });
  }

  return trancatedDate;
};

module.exports = getDateToByDateFrom;
