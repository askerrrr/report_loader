var getNextMonth = require("./getNextMonth.js");
var getNextYearDate = require("./getNextYearDate.js");

var getNextPeriod = (currentYear, currentMonth) => {
  var { nextMonth } = getNextMonth(currentMonth);

  if (nextMonth > 12) {
    var nextYear = ++currentYear;

    var nextYearDate = getNextYearDate(nextYear);

    return nextYearDate;
  }

  var currentYearDate = [currentYear, nextMonth, "15"].join("-");

  return currentYearDate;
};

module.exports = getNextPeriod;
