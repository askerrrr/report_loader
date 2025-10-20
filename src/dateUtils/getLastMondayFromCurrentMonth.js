var getPreviousMonthMondays = require("./getPreviousMonthMondays");
var getPreviousMonthSundays = require("./getPreviousMonthSundays");
var getMondaysOrSundaysOfMonth = require("./getMondaysOrSundaysOfMonth");

var getLastMondayFromCurrentMonth = () => {
  var date = new Date();
  var currentDay = date.getDate();
  var currentDate = date.toISOString().split("T")[0];
  var { mondays } = getMondaysOrSundaysOfMonth(currentDate, "monday");
  var daysAsNum = mondays.map((monday) => +monday.split("T")[0].split("-")[2]);
  var previousDays = daysAsNum.filter((day) => day <= currentDay);
  var penultimateDay = previousDays.at(-2);
  var penultimateMondayIndex = previousDays.indexOf(penultimateDay);

  if (!previousDays.length || !penultimateDay || penultimateMondayIndex === -1) {
    var { mondays } = getPreviousMonthMondays(currentDate);
    var lastMonday = mondays.at(-1);
    return { lastMonday: lastMonday.split("T")[0] };
  }

  var monday = mondays[penultimateMondayIndex];
  return { lastMonday: monday.split("T")[0] };
};

var getLastMonday = async (monthNumFromDateFrom, mondays, dateTo) => {
  if (!dateTo) {
    var { monday } = getLastMondayFromCurrentMonth();
    return monday;
  }

  var [year, monthNumFromDateTo] = dateTo.split("=").map(Number);
  var { sundays } = getMondaysOrSundaysOfMonth(dateTo, "sunday");

  if (monthNumFromDateFrom != monthNumFromDateTo) {
    var sundayIndex = sundays.findIndex((sunday) => sunday === new Date(dateTo).toISOString());

    if (sundayIndex === 0) {
      var lastMonday = mondays[mondays.length - 1];
      var lastMondayDayNum = +lastMonday.split("-")[2];
    }
  }
};

var getLastSunday = async () => {
  var date = new Date();
  var currentDay = date.getDate();
  var currentDate = date.toISOString().split("T")[0];
  var { sundays } = getMondaysOrSundaysOfMonth(currentDate, "sunday");
  var daysAsNum = sundays.map((sunday) => {
    if (sunday) {
      return +sunday.split("T")[0].split("-")[2];
    }
  });

  var previousDays = daysAsNum.filter((day) => day <= currentDay);
  var penultimateDay = previousDays.at(-2);
  var penultimateSundayIndex = previousDays.indexOf(penultimateDay);

  if (!previousDays.length || !penultimateDay || penultimateSundayIndex === -1) {
    var { sundays } = getPreviousMonthSundays(currentDate);
    var lastSunday = sundays.at(-1);
    return { sunday: lastSunday.split("T")[0] };
  }

  var sunday = sundays[penultimateSundayIndex];
  return { sunday: sunday.split("T")[0] };
};

module.exports = { getLastMonday, getLastSunday, getLastMondayFromCurrentMonth };
