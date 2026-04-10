import checkReportExistsInTree from "./checkReportExistsInTree.js";

var filteringOfRequiredReportPeriods = ({ reportsQueue, abandonedReports }, requiredReportPeriods, reportTree) => {
  var resultOfTheFirstFiltering = [];
  var abandonedReportsAddedToQueue = false;

  while (requiredReportPeriods.length) {
    var period = requiredReportPeriods.shift();

    var { reportIsExist } = checkReportExistsInTree(period.dateFrom, reportTree);

    if (!reportIsExist) {
      resultOfTheFirstFiltering.push(period);
    }
  }

  if (resultOfTheFirstFiltering.length === 0) {
    return { filteredRequiredReportPeriods: [], abandonedReportsAddedToQueue };
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
    return { filteredRequiredReportPeriods: [], abandonedReportsAddedToQueue };
  }

  if (abandonedReports.length === 0) {
    return { filteredRequiredReportPeriods: resultOfTheSecondFiltering, abandonedReportsAddedToQueue };
  }

  var mergedArray = [...abandonedReports, ...resultOfTheSecondFiltering];
  var mergedArrayWithoutRepeat = [...new Set([...mergedArray])];

  return { filteredRequiredReportPeriods: mergedArrayWithoutRepeat, abandonedReportsAddedToQueue: true };
};

export default filteringOfRequiredReportPeriods;
