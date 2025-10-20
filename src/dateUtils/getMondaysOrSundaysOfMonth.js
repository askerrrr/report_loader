var checkIfSundaysAreMultipleOfSeven = (sundays) => sundays.map((sanday) => +sanday.split("T")[0].split("-")[2] % 7 === 0).every((i) => i === true);

/**
 * @param {'sunday' | 'monday'} weekDayName
 */

var getMondaysOrSundaysOfMonth = (date, weekDayName) => {
  var weekDays = [];
  try {
    var weekDayNum = weekDayName === "sunday" ? 0 : 1;
    var [year, month] = date.split("-");

    date = new Date(year, month, 0);
    daysPerMonth = date.getDate();

    for (var i = 0; i <= daysPerMonth; i++) {
      var nextDay = new Date(`${year}-${month}-${String(i).padStart(2, "0")}`);

      if (nextDay.getDay() === weekDayNum) {
        weekDays.push(nextDay.toISOString());
      }
    }

    if (weekDayName === "sunday") {
      var isSundayMultipleOfSeven = checkIfSundaysAreMultipleOfSeven(weekDays);

      if (isSundayMultipleOfSeven) {
        weekDays = [null, ...weekDays];
      }
      return { sundays: weekDays };
    }
    return { mondays: weekDays };
  } catch (e) {
    console.log({ date, weekDays, e });
  }
};

module.exports = getMondaysOrSundaysOfMonth;
