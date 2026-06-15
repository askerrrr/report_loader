import checkReportExistsInTree from "./checkReportExistsInTree.js";

var filteringOfRequiredReportPeriods = (userLoadingState, requiredReportPeriods, reportTree) => {
  var resultOfTheFirstFiltering = [];
  var abandonedReportsAddedToQueue = false;
  var { reportsQueue, abandonedReports, emptyReportPeriodsIndexes } = userLoadingState;

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

  var resultOfTheThirdFiltering = [];

  if (emptyReportPeriodsIndexes.length) {
    while (resultOfTheSecondFiltering.length) {
      var elem = resultOfTheSecondFiltering.shift();

      var emptyReportPeriodIndexIsExist = emptyReportPeriodsIndexes.find((index) => index === elem.index);

      if (!emptyReportPeriodIndexIsExist) {
        resultOfTheThirdFiltering.push(elem);
      }
    }
  }

  if (abandonedReports.length === 0) {
    return { filteredRequiredReportPeriods: resultOfTheThirdFiltering, abandonedReportsAddedToQueue };
  }

  if (resultOfTheThirdFiltering.length === 0) {
    return { filteredRequiredReportPeriods: [], abandonedReportsAddedToQueue };
  }

  var mergedArray = [...abandonedReports, ...resultOfTheThirdFiltering];
  var mergedArrayWithoutRepeat = [...new Set([...mergedArray])];

  return { filteredRequiredReportPeriods: mergedArrayWithoutRepeat, abandonedReportsAddedToQueue: true };
};

export default filteringOfRequiredReportPeriods;
