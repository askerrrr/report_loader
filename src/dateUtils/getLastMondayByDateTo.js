import getPreviousMonthMondays from "./getPreviousMonthMondays.js";
import getMondaysOrSundaysOfMonth from "./getMondaysOrSundaysOfMonth.js";
import { getLastMondayFromCurrentMonth } from "./getLastMondayFromCurrentMonth.js";

var getLastMondayByDateTo = (dateTo) => {
  if (!dateTo) {
    var { lastMonday } = getLastMondayFromCurrentMonth();
    return { lastMonday };
  }

  var { sundays } = getMondaysOrSundaysOfMonth(dateTo, "sunday");
  var sundayIndex = sundays.findIndex((sunday) => sunday === new Date(dateTo).toISOString());

  if (sundayIndex === 0) {
    var { mondays } = getPreviousMonthMondays(dateTo);
    var lastMonday = mondays[mondays.length - 1].split("T")[0];
    return { lastMonday };
  }

  var { mondays } = getMondaysOrSundaysOfMonth(dateTo, "monday");
  var lastMonday = mondays[sundayIndex - 1].split("T")[0];
  return { lastMonday };
};

export default getLastMondayByDateTo;
