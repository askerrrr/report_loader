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

  if (filteredRequiredReportPeriods.length === 0) {
    return { filteredRequiredReportPeriods };
  }

  var cb = (item) => item.dateFrom === filteredRequiredReportPeriods[i].dateFrom;

  for (var i = 0; i < filteredRequiredReportPeriods.length; i++) {
    if (reportsQueue.find(cb)) {
      filteredRequiredReportPeriods.splice(i, 1);
    }
  }

  for (var i = 0; i < filteredRequiredReportPeriods.length; i++) {
    if (failedReportsQueue.find(cb)) {
      filteredRequiredReportPeriods.splice(i, 1);
    }
  }

  for (var i = 0; i < filteredRequiredReportPeriods.length; i++) {
    if (abandonedReports.find(cb)) {
      filteredRequiredReportPeriods.splice(i, 1);
    }
  }

  return { filteredRequiredReportPeriods };
};

module.exports = filteringOfRequiredReportPeriods;
