var filterExistRequiredReportPeriods = (requireddateUtils, reportQueue) => {
  var filteredRequireddateUtils = [];

  if (!reportQueue.length) {
    return { filteredRequireddateUtils: requireddateUtils };
  }

  if (requireddateUtils.length > reportQueue.length) {
    for (var queueItem of reportQueue) {
      if (!requireddateUtils.find((item) => item.dateFrom === queueItem.dateFrom)) {
        filteredRequireddateUtils.push(queueItem);
      }
    }

    return { filteredRequireddateUtils };
  }

  for (var item of requireddateUtils) {
    if (!reportQueue.find((queueItem) => queueItem.dateFrom === item.dateFrom)) {
      filteredRequireddateUtils.push(item);
    }
  }

  return { filteredRequireddateUtils };
};

module.exports = filterExistRequiredReportPeriods;
