var wbapi = require("./WBAPI");
var sortYearsTree = require("./sortYearTree");
var parseReports = require("./reportParsing");
var dbutils = require("../../../database/utils");
var addNewSkusToListGoods = require("./addNewSkusToListGoods");
var insertReportToReportTree = require("./reportTreeBuilder");
var updateListGoodsMetrics = require("./updateListGoodsMetrics");

var reportsProcessing = async (userId, dateFrom, dateTo, token, session) => {
  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearReport = startYear !== endYear;

  var { reportTree } = await dbutils.getReportsTree(userId, session);
  var reports = await wbapi.getReports(userId, dateFrom, dateTo, token);
  var reportId = reports.weeklyFinancialReport[0].realizationreport_id;

  var { years, year, month } = await insertReportToReportTree(dateFrom, dateTo, reportId, reportTree);
  var sortedYears = sortYearsTree(years);

  if (isCrossYearReport) {
    var startYearTaxParams = await dbutils.addNewTaxYearToDb(userId, startYear, session);
    var endYearTaxParams = await dbutils.addNewTaxYearToDb(userId, endYear, session);
    var taxParams = { startYearTaxParams, endYearTaxParams };

    var { report, skuNamesAndIds, recalculatedTaxParams } = await parseReports(reports, taxParams, isCrossYearReport);

    await dbutils.changeTaxParamsToDb(userId, startYear, session, recalculatedTaxParams.startYearTaxParams);
    await dbutils.changeTaxParamsToDb(userId, endYear, session, recalculatedTaxParams.endYearTaxParams);
  } else {
    var taxParams = await dbutils.addNewTaxYearToDb(userId, year, session);
    var { report, skuNamesAndIds, recalculatedTaxParams } = await parseReports(reports, taxParams);

    await dbutils.changeTaxParamsToDb(userId, year, session, recalculatedTaxParams);
  }

  report.dateTo = dateTo;
  report.userId = userId;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.crossesTaxYears = isCrossYearReport;
  report.recordTo = { year, month };

  var { listGoods } = await getListGoodsFromDb(userId, session);
  var { updatedListGoods } = await addNewSkusToListGoods(listGoods, skuNamesAndIds, isCrossYearReport, startYear, endYear);
  var { listGoods } = await updateListGoodsMetrics(report, updatedListGoods);

  await dbutils.saveReportToDb(userId, report, session);
  await dbutils.updateReportTree(userId, sortedYears, session);
  await dbutils.saveListGoodsToDb(userId, updatedListGoods, session);

  return { reportId, year, month, dateFrom, dateTo, totalTaxAmount: report.totalTaxAmount };
};

module.exports = reportsProcessing;
