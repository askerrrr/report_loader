var checkReportExistsInTree = require("./checkReportExistsInTree");

var filteringOfRequiredReportPeriods = ({ reportsQueue, failedReportsQueue, abandonedReports }, requiredReportPeriods, reportTree) => {
  var filteredRequiredReportPeriods = [];

  for (var i = 0; i < requiredReportPeriods.length; i++) {
    var { dateFrom } = requiredReportPeriods[i];
    var { reportIsExist } = checkReportExistsInTree(dateFrom, reportTree);

    if (!reportIsExist) {
      var splicedElem = requiredReportPeriods.splice(i, 1);
      filteredRequiredReportPeriods.push(...splicedElem);
    }
  }

  var cb = (period) => period.dateFrom === dateFrom;

  for (var { dateFrom, dateTo, index } of requiredReportPeriods) {
    if (!reportsQueue.find(cb)) {
      if (!failedReportsQueue.find(cb)) {
        if (!abandonedReports.find(cb)) {
          filteredRequiredReportPeriods.push({ dateFrom, dateTo, index });
        }
      }
    }
  }

  return { filteredRequiredReportPeriods };
};

module.exports = filteringOfRequiredReportPeriods;
