/**
 * @param {'sunday' | 'monday'} weekDayName
 */

var getMondaysOrSundaysOfMonth = (date, weekDayName) => {
  var weekDays = [];

  var weekDayNum = weekDayName === "sunday" ? 0 : 1;
  var [year, month] = date.split("-");

  date = new Date(year, month, 0);
  var daysPerMonth = date.getDate();

  for (var i = 0; i <= daysPerMonth; i++) {
    var nextDay = new Date(`${year}-${month}-${String(i).padStart(2, "0")}`);

    if (nextDay.getDay() === weekDayNum) {
      weekDays.push(nextDay.toISOString());
    }
  }

  if (weekDayName === "sunday") {
    return { sundays: weekDays };
  }
  return { mondays: weekDays };
};

export default getMondaysOrSundaysOfMonth;
