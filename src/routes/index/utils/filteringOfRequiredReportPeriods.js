var checkReportExistsInTree = require("./checkReportExistsInTree");

var filteringOfRequiredReportPeriods = ({ reportsQueue, failedReportsQueue, abandonedReports }, requiredReportPeriods, reportTree) => {
  var filteredRequiredReportPeriods = [];

  while (requiredReportPeriods.length) {
    var period = requiredReportPeriods.shift();

    var { reportIsExist } = checkReportExistsInTree(period.dateFrom, reportTree);

    if (!reportIsExist) {
      filteredRequiredReportPeriods.push(period);
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
  //comment
};

module.exports = filteringOfRequiredReportPeriods;
