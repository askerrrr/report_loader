var checkIfSundaysAreMultipleOfSeven = (sundays) => sundays.map((sanday) => +sanday.split("T")[0].split("-")[2] % 7 === 0).every((i) => i === true);

var getWeekDaysFromMonth = (dateFrom, weekDayName) => {
  var date = new Date(dateFrom);

  var month = date.getMonth();
  var weekDayNumber = weekDayName == "sunday" ? 0 : 1;

  date.setDate(weekDayNumber);

  if (date !== new Date(dateFrom)) {
    date = null;
    date = new Date(dateFrom);
    date.setDate(1);
  }

  while (date.getDay() !== weekDayNumber) {
    date.setDate(date.getDate() + 1);
  }

  var weekDays = [];

  while (date.getMonth() === month) {
    var weekDay = new Date(date.getTime()).toISOString();
    weekDays.push(weekDay);
    date.setDate(date.getDate() + 7);
  }

  if (weekDayName === "sunday") {
    var isSundayMultipleOfSeven = checkIfSundaysAreMultipleOfSeven(weekDays);

    if (isSundayMultipleOfSeven) {
      weekDays = [null, ...weekDays];
    }
  }
  return weekDays;
};

var isMonday = (dateFrom) => {
  var mondays = getWeekDaysFromMonth(dateFrom, "monday");

  return mondays.includes(new Date(dateFrom).toISOString());
};

module.exports = { isMonday, getWeekDaysFromMonth };


