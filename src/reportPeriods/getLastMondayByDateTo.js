var getPreviousMonthMondays = require("./getPreviousMonthMondays");
var { getLastMondayFromCurrentMonth } = require("./getLastMondayFromCurrentMonth");
var getMondaysOrSundaysOfMonth = require("../periodUtils/utils/getMondaysOrSundaysOfMonth");

var getLastMondayByDateTo = (dateTo) => {
  if (!dateTo) {
    var { lastMonday } = getLastMondayFromCurrentMonth();
    return { lastMonday };
  }

  var { sundays } = getMondaysOrSundaysOfMonth(dateTo, "sunday");
  var sundayIndex = sundays.findIndex((sunday) => sunday === new Date(dateTo).toISOString());

  if (sundayIndex === 0) {
    var { mondays } = getPreviousMonthMondays(dateTo);
    var lastMonday = mondays[mondays.length - 1].split("T")[0];
    return { lastMonday };
  }

  var { mondays } = getMondaysOrSundaysOfMonth(dateTo, "monday");
  var lastMonday = mondays[sundayIndex - 1].split("T")[0];
  return { lastMonday };
};

module.exports = getLastMondayByDateTo;
