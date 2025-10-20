var getMondaysOrSundaysOfMonth = require("./getMondaysOrSundaysOfMonth");

var getNextDateFrom = (monthNum, year) => `${year}-${String(monthNum).padStart(2, "0")}-${15}`;

var getYearMondays = (date) => {
  var [year, monthNum] = date.split("-").map(Number);

  var yearMondays = [];

  for (var i = monthNum; i <= 12; i++) {
    var { mondays } = getMondaysOrSundaysOfMonth(date, "monday");
    date = getNextDateFrom(i + 1, year);
    yearMondays.push(...mondays);
  }

  return { yearMondays: yearMondays.map((monday) => monday.split("T")[0]) };
};

module.exports = getYearMondays;
