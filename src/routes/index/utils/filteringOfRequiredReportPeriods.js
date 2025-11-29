var checkReportExistsInTree = require("./checkReportExistsInTree");

var filteringOfRequiredReportPeriods = ({ reportsQueue, abandonedReports }, requiredReportPeriods, reportTree) => {
  var resultOfTheFirstFiltering = [];

  while (requiredReportPeriods.length) {
    var period = requiredReportPeriods.shift();

    var { reportIsExist } = checkReportExistsInTree(period.dateFrom, reportTree);

    if (!reportIsExist) {
      resultOfTheFirstFiltering.push(period);
    }
  }

  if (resultOfTheFirstFiltering.length === 0) {
    return { filteredRequiredReportPeriods: [] };
  }

  var cb = (item) => item.dateFrom === elem.dateFrom;
  var resultOfTheSecondFiltering = [];

  while (resultOfTheFirstFiltering.length) {
    var elem = resultOfTheFirstFiltering.shift();
    if (!reportsQueue.find(cb)) {
      resultOfTheSecondFiltering.push(elem);
    }
  }

  if (resultOfTheSecondFiltering.length === 0) {
    return { filteredRequiredReportPeriods: [] };
  }

  if (abandonedReports.length === 0) {
    return { filteredRequiredReportPeriods: resultOfTheSecondFiltering };
  }

  var resultOfTheThirdFiltering = [];

  while (resultOfTheSecondFiltering.length) {
    var elem = resultOfTheSecondFiltering.shift();
    if (!abandonedReports.find(cb)) {
      resultOfTheThirdFiltering.push(elem);
    }
  }

  return { filteredRequiredReportPeriods: resultOfTheThirdFiltering };
};

module.exports = filteringOfRequiredReportPeriods;
