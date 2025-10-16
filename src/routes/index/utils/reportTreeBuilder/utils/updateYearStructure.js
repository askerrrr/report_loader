var getMonthNameAndIndex = require("./getMonthNameAndIndex");
var insertReportIdAndFullPeriodToReportIds = require("./insertReportIdAndFullPeriodToReportIds");

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

module.exports = updateYearStructure;
