var getMondayIndex = require("./getMondayIndex");
var getMondaysOrSundaysOfMonth = require("../../../../../periodUtils/utils/getMondaysOrSundaysOfMonth");

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

module.exports = insertReportIdAndFullPeriodToReportIds;
