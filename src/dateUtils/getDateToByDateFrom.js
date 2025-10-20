var getNextPeriod = require("./getNextPeriod.js");
var hasPeriodOverlap = require("./hasPeriodOverlap.js");
var getMondaysOrSundaysOfMonth = require("./getMondaysOrSundaysOfMonth.js");

var getDateToByDateFrom = (dateFrom) => {
  var [year, month, day] = dateFrom.split("-").map(Number);

  var dateTo;

  var { overlap } = hasPeriodOverlap(year, month, day);

  if (overlap) {
    var { nextPeriod } = getNextPeriod(year, month);
    var { sundays } = getMondaysOrSundaysOfMonth(nextPeriod, "sunday");
    var firstSundayIndex = 0;
    dateTo = sundays[firstSundayIndex];
    var trancatedDate = dateTo.split("T")[0];
    return trancatedDate;
  }

  var { mondays } = getMondaysOrSundaysOfMonth(dateFrom, "monday");
  var dateFromISO = new Date(dateFrom).toISOString();
  var mondayIndex = mondays.indexOf(dateFromISO);
  var { sundays } = getMondaysOrSundaysOfMonth(dateFrom, "sunday");
  var sundayIndex = mondayIndex + 1;

  if (sundayIndex === sundays.length) {
    sundayIndex--;
  }

  dateTo = sundays[sundayIndex];
  var trancatedDate = dateTo.split("T")[0];
  return trancatedDate;
};

module.exports = getDateToByDateFrom;
