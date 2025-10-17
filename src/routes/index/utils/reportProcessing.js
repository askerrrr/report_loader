var getReports = require("./getReports");
var sortYearsTree = require("./sortYearTree");
var dbUtils = require("../../../database/utils");
var insertReportToReportTree = require("./reportTreeBuilder");
var parseReports = require("./writeAndCalcReportDataFromWBAPI");

var reportProcessing = async (userId, dateFrom, dateTo, token) => {
  var reports = await getReports(userId, dateFrom, dateTo, token);
  var reportId = reports.mainReport[0].realizationreport_id;

  var { years } = await dbUtils.getReportsTree(userId);
  var { years, year, month } = await insertReportToReportTree(dateFrom, dateTo, reportId, years);
  var sortedYears = await sortYearsTree(years);
  await dbUtils.updateReportTree(userId, sortedYears);

  var { taxRate, paidTaxAmount } = await dbUtils.addNewTaxYearToDb(userId, +year);

  var { report, skuNamesAndIds } = await parseReports(taxRate, reports);

  paidTaxAmount += report.totalTaxAmount;
  await dbUtils.changePaidTaxAmountToDb(userId, year, paidTaxAmount);

  report.dateTo = dateTo;
  report.userId = userId;
  report.taxRate = taxRate;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.recordTo = { year, month };

  var success = await dbUtils.saveReportToDb(userId, report);
  console.log({ success });
};

module.exports = reportProcessing;
