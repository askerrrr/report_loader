var { getMondayIndex } = require("./monday");
var { getMonthNameAndIndex } = require("./month");
var getMondaysOrSundaysOfMonth = require("../../../../../periodUtils/utils/getMondaysOrSundaysOfMonth");

var createNextYearMonths = (reportIds) => {
  var firstMonthIndex = 11;
  var firstMonthName = "январь";

  var months = new Array(12).fill(null);

  months[firstMonthIndex] = { month: firstMonthName, reportIds };

  return months;
};

/**
 * @param {'overlap - yes' | 'overlap - no'} overlapStatus
 */

var insertReportIdAndFullPeriodToReportIds = (date, fullPeriod, reportId, overlapStatus, reportIds = null) => {
  if (!reportIds) {
    reportIds = new Array(5).fill(null);
  }

  var { mondays } = getMondaysOrSundaysOfMonth(date, "monday");

  if (overlapStatus === "overlap - yes") {
    reportIds[mondays.length] = { reportId, ...fullPeriod };
  } else {
    var { mondayIndex } = getMondayIndex(date, mondays);
    reportIds[mondayIndex] = { reportId, ...fullPeriod };
  }

  return reportIds;
};

var insertMonthDataToMonths = async (reportId, fullPeriod, date, overlapStatus) => {
  var reportIds = insertReportIdAndFullPeriodToReportIds(date, fullPeriod, reportId, overlapStatus);
  var monthNum = +date.split("-")[1];
  var { monthName, monthIndex } = getMonthNameAndIndex(monthNum);
  var months = new Array(12).fill(null);
  months[monthIndex] = { month: monthName, reportIds };
  return months;
};

/**
 * @param {'overlap - yes' | 'overlap - no'} overlapStatus
 */

var updateYearStructure = async (months, year, monthNum, reportDate, reportId, fullPeriod, overlapStatus) => {
  var { monthName, monthIndex } = getMonthNameAndIndex(monthNum);

  var reportIds = months[monthIndex]?.reportIds ?? new Array(5).fill(null);

  reportIds = insertReportIdAndFullPeriodToReportIds(reportDate, fullPeriod, reportId, overlapStatus, reportIds);

  months[monthIndex] = { month: monthName, reportIds };

  return { year, months };
};

var isNextMonthReportNeeded = async (dateFrom, dateTo) => {
  var [startYear, startMonth, startDay] = dateFrom.split("-");
  var [_, endMonth, endDay] = dateTo.split("-");

  if (startMonth === endMonth) {
    return;
  }

  var daysInCurrentMonth = new Date(startYear, startMonth, 0).getDate();

  return daysInCurrentMonth - startDay + 1 < +endDay;
};

var getFirstMonthFromNextYear = (months) => months[11] ?? { month: "январь", reportIds: new Array(5).fill(null) };

module.exports = {
  updateYearStructure,
  createNextYearMonths,
  getFirstMonthFromNextYear,
  insertMonthDataToMonths,
  isNextMonthReportNeeded,
  insertReportIdAndFullPeriodToReportIds,
};
