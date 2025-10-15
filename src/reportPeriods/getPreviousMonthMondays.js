var { getWeekDaysFromMonth } = require("../periodUtils/services/getWeekDaysFromMonth");

var getPreviousMonthMondays = (dateTo) => {
  if (!dateTo) {
  }

  var [year, monthNum] = dateTo.split("-").map(Number);

  if (monthNum === 1) {
    var previousYear = year - 1;
    var lastMonthNumOfPreviousYear = 12;
    var date = `${previousYear}-${lastMonthNumOfPreviousYear}-15`;
    var mondays = getWeekDaysFromMonth(date, "monday");
    return { mondays };
  }

  var previousMonthNum = monthNum - 1;
  var previousMonthStr = previousMonthNum <= 9 ? "0" + previousMonthNum : previousMonthNum;
  var date = `${year}-${previousMonthStr}-15`;
  var mondays = getWeekDaysFromMonth(date, "monday");
  return { mondays };
};

module.exports = getPreviousMonthMondays;
