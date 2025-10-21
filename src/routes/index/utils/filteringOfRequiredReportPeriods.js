var filteringOfRequiredReportPeriods = ({ reportsQueue, failedReportsQueue, abandonedReports }, requiredReportPeriods) => {
  var filteredRequiredReportPeriods = [];
  var query = (period) => period.dateFrom === dateFrom;

  for (var { dateFrom, dateTo, index } of requiredReportPeriods) {
    if (!reportsQueue.find(query)) {
      if (!failedReportsQueue.find(query)) {
        if (!abandonedReports.find(query)) {
          filteredRequiredReportPeriods.push({ dateFrom, dateTo, index });
        }
      }
    }
  }

  return { filteredRequiredReportPeriods };
};

module.exports = filteringOfRequiredReportPeriods;
