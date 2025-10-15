var checkIfSundaysAreMultipleOfSeven = (sundays) => sundays.map((sanday) => +sanday.split("T")[0].split("-")[2] % 7 === 0).every((i) => i === true);

var correctWeekDay = (weekDay, i, arr) => {
  if (weekDay === null) {
    return;
  }

  var hour = weekDay.split("T")[1].split(":")[0];

  if (hour !== "00") {
    var [year, month, day] = weekDay.split("T")[0].split("-");
    var nextDay = +day + 1;
    if (nextDay <= 9) {
      nextDay = "0" + nextDay;
    }

    weekDay = `${year}-${month}-${nextDay}T00:00:00.000Z`;
  }

  return weekDay;
};

var getWeekDaysFromMonth = (dateFrom, weekDayName) => {
  var date = new Date(dateFrom);
  console.log({ dateFrom, weekDayName });
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

  return weekDays.map(correctWeekDay);
};

var isMonday = (dateFrom) => {
  var mondays = getWeekDaysFromMonth(dateFrom, "monday");

  return mondays.includes(new Date(dateFrom).toISOString());
};

module.exports = { isMonday, getWeekDaysFromMonth };
