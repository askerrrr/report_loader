var getWeekDaysFromMonth = require("./getWeekDaysFromMonth");

var getNextDateFrom = (monthNum, year) => (monthNum < 10 ? `${year}-0${monthNum}-15` : `${year}-${monthNum}-15`);

var getYearMondays = (date) => {
  var [year, monthNum] = date.split("-").map(Number);

  var yearMondays = [];

  for (var i = monthNum; i <= 12; i++) {
    var mondays = getWeekDaysFromMonth(date, "monday");
    date = getNextDateFrom(i + 1, year);

    yearMondays.push(...mondays);
  }

  return yearMondays.map((monday) => monday.split("T")[0]);
};

module.exports = getYearMondays;
