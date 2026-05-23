import getMonthNameAndIndex from "./getMonthNameAndIndex.js";
import insertReportIdAndFullPeriodToReportIds from "./insertReportIdAndFullPeriodToReportIds.js";

/**
 * @param {'overlap - yes' | 'overlap - no'} overlapStatus
 */

var updateYearStructure = (months, year, monthNum, reportDate, reportId, fullPeriod, overlapStatus) => {
  var { monthName, monthIndex } = getMonthNameAndIndex(monthNum);

  var reportIds = months[monthIndex]?.reportIds ?? new Array(5).fill(null);

  reportIds = insertReportIdAndFullPeriodToReportIds(reportDate, fullPeriod, reportId, overlapStatus, reportIds);

  months[monthIndex] = { month: monthName, reportIds };

  return { year, months };
};

export default updateYearStructure;
