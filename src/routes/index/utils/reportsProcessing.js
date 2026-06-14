import wbapi from "./WBAPI/index.js";
import parseJwt from "./parseJwt.js";
import sortYearsTree from "./sortYearTree.js";
import parseReports from "./reportParsing/index.js";
import dbUtils from "../../../database/utils/index.js";
import addNewSkusToListGoods from "./addNewSkusToListGoods.js";
import updateListGoodsMetrics from "./updateListGoodsMetrics.js";
import insertReportToReportTree from "./reportTreeBuilder/index.js";

var reportsProcessing = async (userId, dateFrom, dateTo, token, session) => {
  var lastLoadedReport = {};
  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearReport = startYear !== endYear;

  var { reportTree } = await dbUtils.getReportsTree(userId, session);
  var { reports, reportPeriodIsEmpty } = await wbapi.getReports(userId, dateFrom, dateTo, token);

  if (reportPeriodIsEmpty) {
    return { lastLoadedReport, reportPeriodIsEmpty };
  }

  await dbUtils.updateLastUsedTokenTimestamp(userId, session);

  var { reportId } = reports.weeklyFinancialReport[0];
  console.log({ reportId });
  var { years, year, month } = insertReportToReportTree(dateFrom, dateTo, reportId, reportTree);
  var sortedYears = sortYearsTree(years);

  if (isCrossYearReport) {
    var startYearTaxParams = await dbUtils.addNewTaxYearToDb(userId, startYear, session);
    var endYearTaxParams = await dbUtils.addNewTaxYearToDb(userId, endYear, session);
    var taxParams = { startYearTaxParams, endYearTaxParams };

    var { report, skuNamesAndIds, recalculatedTaxParams } = await parseReports(reports, taxParams, isCrossYearReport);

    await dbUtils.changeTaxParamsToDb(userId, session, recalculatedTaxParams.startYearTaxParams, recalculatedTaxParams.endYearTaxParams);
  } else {
    var taxParams = await dbUtils.addNewTaxYearToDb(userId, year, session);
    var { report, skuNamesAndIds, recalculatedTaxParams } = await parseReports(reports, taxParams);

    await dbUtils.changeTaxParamsToDb(userId, session, recalculatedTaxParams);
  }

  report.dateTo = dateTo;
  report.userId = userId;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.crossesTaxYears = isCrossYearReport;
  report.recordedTo = { year, month };
  report.isFinancesAccounted = false;

  var { listGoods } = await dbUtils.getListGoodsFromDb(userId, session);
  var { listGoodsWithNewSkus } = await addNewSkusToListGoods(listGoods, skuNamesAndIds, isCrossYearReport, startYear, endYear);
  var { listGoodsWithUpdatedSkuMetrics } = await updateListGoodsMetrics(report, listGoodsWithNewSkus);

  await dbUtils.saveReportToDb(userId, report, session);
  await dbUtils.updateReportTree(userId, sortedYears, session);
  await dbUtils.saveListGoodsToDb(userId, listGoodsWithUpdatedSkuMetrics, session);

  lastLoadedReport = { reportId, year, month, dateFrom, dateTo, totalTaxAmount: report.totalTaxAmount };
  return { lastLoadedReport, reportPeriodIsEmpty };
};

export default reportsProcessing;
