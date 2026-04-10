var splitWeeklyFinancialReportByYear = async (report) => {
  var startYearWeeklyFinancialReport = [];
  var endYearWeeklyFinancialReport = [];

  var startYear = report[0].date_from.split("-")[0];

  for (var item of report) {
    var saleYear = item.sale_dt.split("-")[0];

    if (saleYear === startYear) {
      startYearWeeklyFinancialReport.push(item);
    } else {
      endYearWeeklyFinancialReport.push(item);
    }
  }

  return { startYearWeeklyFinancialReport, endYearWeeklyFinancialReport };
};

export default splitWeeklyFinancialReportByYear;
