var filteringOfRequiredReportPeriods = (userLoadingState, requiredReportPeriods, savedReportPeriodsFromDb) => {
  var resultOfTheFirstFiltering = [];
  var abandonedReportsAddedToQueue = false;
  var { reportsQueue, abandonedReports, emptyReportPeriods } = userLoadingState;

  while (requiredReportPeriods.length) {
    var period = requiredReportPeriods.shift();

    var report = savedReportPeriodsFromDb.find((item) => item.dateFrom === period.dateFrom);

    if (!report) {
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

  if (emptyReportPeriods?.length) {
    while (resultOfTheSecondFiltering.length) {
      var elem = resultOfTheSecondFiltering.shift();

      var reportPeriodInEmptyReportPeriods = emptyReportPeriods.find(cb);

      if (!reportPeriodInEmptyReportPeriods) {
        resultOfTheThirdFiltering.push(elem);
      }
    }
  } else {
    resultOfTheThirdFiltering = resultOfTheSecondFiltering;
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
