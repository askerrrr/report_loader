var getMondaysOrSundaysOfMonth = require("../../../../../periodUtils/utils/getMondaysOrSundaysOfMonth");

var getMondayIndex = async (date) => {
  var { mondays } = getMondaysOrSundaysOfMonth(date, "monday");

  var mondayIndex = mondays.findIndex((monday) => monday === new Date(date).toISOString());

  return mondayIndex === -1 ? 0 : mondayIndex;
};

var getMondaysQtyInMonth = async (date) => {
  var { mondays } = getMondaysOrSundaysOfMonth(date, "monday");
  return mondays.length;
};

module.exports = { getMondayIndex, getMonthMondays, getMondaysQtyInMonth };
