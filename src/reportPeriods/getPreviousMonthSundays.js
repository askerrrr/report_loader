var getMondaysOrSundaysOfMonth = require("../periodUtils/utils/getMondaysOrSundaysOfMonth");

var getPreviousMonthSundays = (date) => {
  var [year, monthNum] = date.split("-").map(Number);

  if (monthNum === 1) {
    var previousYear = year - 1;
    var lastMonthNumOfPreviousYear = 12;
    date = `${previousYear}-${lastMonthNumOfPreviousYear}-15`;
    var { sundays } = getMondaysOrSundaysOfMonth(date, "sunday");
    return { sundays };
  }

  var previousMonthNum = monthNum - 1;
  var previousMonthStr = previousMonthNum <= 9 ? "0" + previousMonthNum : previousMonthNum;
  var date = `${year}-${previousMonthStr}-15`;
  var { sundays } = getMondaysOrSundaysOfMonth(date, "sunday");
  return { sundays };
};

module.exports = getPreviousMonthSundays;
