var { getMondaysQtyInMonth } = require("./monday");
var { setReportIdInReports } = require("./reports");
var { getMonthReportIds, getMonthNameAndIndex } = require("./month");

var getMonthsForCurrentYear = async (monthNum, reports) => {
  var { monthName, monthIndex } = await getMonthNameAndIndex(monthNum);

  var months = new Array(12).fill(null);

  months[monthIndex] = { month: monthName, reports };

  return months;
};

var getMonthsForNewYear = async (reportIds) => {
  var firstMonthIndex = 11,
    firstMonthName = "январь";

  var months = new Array(12).fill(null);

  months[firstMonthIndex] = { month: firstMonthName, reportIds };

  return months;
};

var getFirstMonthReporstForNewYear = async (date, fullPeriod, reportId) => {
  var mondaysQty = await getMondaysQtyInMonth(date);

  var reportIds = new Array(5).fill(null);

  reportIds[mondaysQty] = { reportId, ...fullPeriod };

  return reportIds;
};

var getMonthsData = async (reportId, fullPeriod, date, carry = null) => {
  var reportIds = await getMonthReportIds(date, fullPeriod, reportId, carry);

  var monthNum = date.split("-")[1];

  var { monthName, monthIndex } = await getMonthNameAndIndex(monthNum);

  var months = new Array(12).fill(null);

  months[monthIndex] = { month: monthName, reportIds };

  return months;
};

var getMonthsFromYear = async (years, yearIndex) => {
  var { months } = years[yearIndex];

  return months;
};

var updateYearStructure = async (months, year, monthNum, reportDate, reportId, fullPeriod, carry) => {
  var { monthName, monthIndex } = await getMonthNameAndIndex(monthNum);

  var reportIds = months[monthIndex]?.reportIds ?? new Array(5).fill(null);

  reportIds = await setReportIdInReports(reportDate, reportIds, reportId, fullPeriod, carry);

  months[monthIndex] = { month: monthName, reportIds };

  return { year, months };
};

var isNextMonthReportNeeded = async (dateFrom, dateTo) => {
  var [year, monthFrom, dayFrom] = dateFrom.split("-");
  var [y, monthTo, dayTo] = dateTo.split("-");

  if (monthFrom === monthTo) {
    return;
  }

  var daysInCurrentMonth = new Date(year, monthFrom, 0).getDate();

  return daysInCurrentMonth - dayFrom + 1 < +dayTo;
};

var getNextYearFirstMonth = async (months) => months[11] ?? { month: "январь", reportIds: new Array(5).fill(null) };

module.exports = {
  getMonthsData,
  getMonthsFromYear,
  updateYearStructure,
  getMonthsForNewYear,
  setReportIdInReports,
  getNextYearFirstMonth,
  getMonthsForCurrentYear,
  isNextMonthReportNeeded,
  getFirstMonthReporstForNewYear,
};
