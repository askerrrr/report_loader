var filterExistRequiredReportPeriods = (requiredReportPeriods, reportQueue) => {
  var filteredRequiredReportPeriods = [];

  if (!reportQueue.length) {
    return { filteredRequiredReportPeriods: requiredReportPeriods };
  }

  if (requiredReportPeriods.length > reportQueue.length) {
    for (var queueItem of reportQueue) {
      if (!requiredReportPeriods.find((item) => item.dateFrom === queueItem.dateFrom)) {
        filteredRequiredReportPeriods.push(queueItem);
      }
    }

    return { filteredRequiredReportPeriods };
  }

  for (var item of requiredReportPeriods) {
    if (!reportQueue.find((queueItem) => queueItem.dateFrom === item.dateFrom)) {
      filteredRequiredReportPeriods.push(item);
    }
  }

  return { filteredRequiredReportPeriods };
};

module.exports = filterExistRequiredReportPeriods;
