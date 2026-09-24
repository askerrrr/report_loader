import wbapi from "./WBAPI/index.js";
import dbUtils from "../../../database/utils/index.js";
import processReportSkus from "./reportParsing/index.js";
import getNewSkusToListGoods from "./getNewSkusToListGoods.js";
import getReportTargetYearAndMonth from "./getReportTargetYearAndMonth.js";

var selectedFields = ["listGoods.id", "listGoods.skuName"];
var monthList = ["январь", "февраль", "марта", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];

var reportsProcessing = async (userId, dateFrom, dateTo, token, session) => {
  var lastLoadedReport = {};
  var startYear = +dateFrom.split("-")[0];
  var endYear = +dateTo.split("-")[0];
  var isCrossYearPeriod = startYear !== endYear;

  var { reports, reportPeriodIsEmpty } = await wbapi.getReports(userId, dateFrom, dateTo, token);

  if (reportPeriodIsEmpty) {
    return { lastLoadedReport, reportPeriodIsEmpty };
  }

  await dbUtils.updateWBTokenLastUsedTimestamp(userId, session);
  await dbUtils.updateLastReportRequestTimestamp(userId, session);

  var reportSkus = [];
  var updatedTaxParams = [];
  var { reportId } = reports.weeklyFinancialReport[0];
  var { targetYear, targetMonthIndex } = getReportTargetYearAndMonth(dateFrom, dateTo);

  for (var currentYear = startYear; currentYear <= endYear; currentYear++) {
    var taxParams = await dbUtils.addNewTaxYearToDb(userId, currentYear, session);
    var { skus, recalculatedTaxParams } = await processReportSkus(reports, taxParams, isCrossYearPeriod);

    reportSkus.push(...skus);
    updatedTaxParams.push({ year: currentYear, data: recalculatedTaxParams });
  }

  var report = {};
  report.skus = reportSkus;

  report.dateTo = dateTo;
  report.userId = userId;
  report.dateFrom = dateFrom;
  report.reportId = reportId;
  report.reportIsEmpty = !report.skus.length;
  report.isCrossYearPeriod = isCrossYearPeriod;
  report.recordedTo = { year: targetYear, month: monthList[targetMonthIndex] };

  var newReportPeriod = { reportId, dateFrom, dateTo, year: targetYear, monthIndex: targetMonthIndex, monthName: monthList[targetMonthIndex] };

  await dbUtils.saveReportToDb(report, session);
  await dbUtils.addReportToReportPeriods(userId, newReportPeriod, session);

  if (report.skus.length) {
    await dbUtils.updateTaxParamsToDb(userId, updatedTaxParams, session);

    var skuNames = report.skus.map((sku) => sku.skuName);

    var { listGoods } = await dbUtils.getListGoodsFromDb(userId, skuNames, selectedFields, session);

    var skuNamesAndIds = reportSkus.map((sku) => {
      return { name: sku.skuName, id: sku.id };
    });

    var { newSkus } = getNewSkusToListGoods(listGoods, skuNamesAndIds);

    if (newSkus.length) {
      await dbUtils.saveNewSkusToDb(userId, newSkus, session);
    }
  }

  lastLoadedReport = { reportId, dateFrom, dateTo, month: monthList[targetMonthIndex], year: targetYear };

  return { lastLoadedReport, reportPeriodIsEmpty: report.reportIsEmpty };
};

export default reportsProcessing;
