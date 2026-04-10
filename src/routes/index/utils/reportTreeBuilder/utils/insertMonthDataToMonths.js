import getMonthNameAndIndex from "./getMonthNameAndIndex.js";
import insertReportIdAndFullPeriodToReportIds from "./insertReportIdAndFullPeriodToReportIds.js";

var insertMonthDataToMonths = async (reportId, fullPeriod, date, overlapStatus) => {
  var reportIds = insertReportIdAndFullPeriodToReportIds(date, fullPeriod, reportId, overlapStatus);
  var monthNum = date.split("-")[1];
  var { monthName, monthIndex } = getMonthNameAndIndex(monthNum);
  var months = new Array(12).fill(null);
  months[monthIndex] = { month: monthName, reportIds };
  return months;
};

export default insertMonthDataToMonths;
