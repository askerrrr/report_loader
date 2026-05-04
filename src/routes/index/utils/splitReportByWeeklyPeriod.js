export default splitReportByWeeklyPeriod = (report, weeklyPeriods) => {
  var reports = [];

  if (weeklyPeriods.length === 1) {
    return { reports: report };
  }

  for (var weeklyPeriod of weeklyPeriods) {
    var filteredReport = report.filter((item) => item.date_from <= weeklyPeriod.dateFrom && item.date_to >= weeklyPeriod.dateTo);

    reports.push(filteredReport);
  }

  return { reports };
};
