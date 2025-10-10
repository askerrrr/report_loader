var getWeekDaysFromMonth = require("./getWeekDaysFromMonth");
var getPreviousMonthMondays = require("./getPreviousMonthMondays");
var { getLastMondayFromCurrentMonth } = require("./getLastMondayFromCurrentMonth");

var getLastMondayByDateTo = (dateTo) => {
  if (!dateTo) {
    var { lastMonday } = getLastMondayFromCurrentMonth();
    return { lastMonday };
  }

  var sundays = getWeekDaysFromMonth(dateTo, "sunday");
  var sundayIndex = sundays.findIndex((sunday) => sunday === new Date(dateTo).toISOString());
  if (sundayIndex === 0) {
    var { mondays } = getPreviousMonthMondays(dateTo);
    var lastMonday = mondays[mondays.length - 1].split("T")[0];
    return lastMonday;
  }

  var mondays = getWeekDaysFromMonth(dateTo, "monday");

  var lastMonday = mondays[sundayIndex - 1].split("T")[0];
  return { lastMonday };
};

module.exports = getLastMondayByDateTo;
