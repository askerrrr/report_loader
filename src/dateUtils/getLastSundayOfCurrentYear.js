import getMondaysOrSundaysOfMonth from "./getMondaysOrSundaysOfMonth.js";

var getLastSundayOfCurrentYear = () => {
  var date = new Date();
  var currentYear = date.getFullYear();
  var lastYearDate = currentYear + "-" + 12 + "-" + 31;
  var { sundays } = getMondaysOrSundaysOfMonth(lastYearDate, "sunday");
  var lastSunday = sundays[sundays.length - 1];
  return { lastSunday: lastSunday.split("T")[0] };
};

export default getLastSundayOfCurrentYear;
