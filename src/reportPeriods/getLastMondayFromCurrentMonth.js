var getPreviousMonthMondays = require("./getPreviousMonthMondays");
var getPreviousMonthSundays = require("./getPreviousMonthSundays");
var { getWeekDaysFromMonth } = require("../periodUtils/services/getWeekDaysFromMonth");

var getLastMondayFromCurrentMonth = () => {
  var date = new Date();
  var currentDay = date.getDate();
  var currentDate = date.toISOString().split("T")[0];
  var mondays = getWeekDaysFromMonth(currentDate, "monday");
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
  var sundays = getWeekDaysFromMonth(dateTo, "sunday");

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
  var sundays = getWeekDaysFromMonth(currentDate, "sunday");
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

//getLastSunday().then(console.log).catch(e => console.log({e}))

//var mondays = getWeekDaysFromMonth('2025-04-14', 'monday')
//getLastMonday(4, mondays, '2025-05-04');
//getLastMonday(null, null, null).then(console.log)

module.exports = { getLastMonday, getLastSunday, getLastMondayFromCurrentMonth };
