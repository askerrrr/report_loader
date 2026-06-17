export default splitReportByWeeklyPeriod = (report, weeklyPeriods) => {
  var reports = [];

  if (weeklyPeriods.length === 1) {
    return { reports: report };
  }

  for (var weeklyPeriod of weeklyPeriods) {
    var filteredReport = report.filter((item) => item.dateFrom <= weeklyPeriod.dateFrom && item.dateTo >= weeklyPeriod.dateTo);

    reports.push(filteredReport);
  }

  return { reports };
};
