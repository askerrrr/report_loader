import parseSku from "./parseSku.js";
import truncateNum from "./truncateNum.js";
import calc from "../calcServices/index.js";
import splitSkuByYear from "./splitSkuByYear.js";
import truncateSkuNums from "./truncateSkuNums.js";
import getSkuNamesAndIds from "./getSkuNamesAndIds.js";
import parsePaidStorageReport from "./parsePaidStorageReport.js";
import recalculateSkuAndTaxParams from "./recalculateSkuAndTaxParams.js";
import splitPaidStorageReportByYear from "./splitPaidStorageReportByYear.js";
import splitAdvertisingReportByYear from "./splitAdvertisingReportByYear.js";
import splitWeeklyFinancialReportByYear from "./splitWeeklyFinancialReportByYear.js";

var calculateTotalAdvertisingCosts = (data) => data.reduce((acc, i) => acc + i.updSum, 0);

var processCrossReportSkus = (reports, taxParams) => {
  var recalculatedTaxParams = {};
  recalculatedTaxParams.startYearTaxParams = Object.assign({}, taxParams.startYearTaxParams);
  recalculatedTaxParams.endYearTaxParams = Object.assign({}, taxParams.endYearTaxParams);

  var { endYearTaxParams, startYearTaxParams } = recalculatedTaxParams;

  var { weeklyFinancialReport, paidStorageReport, advertisingReport } = reports;

  var { startYearAd, endYearAd } = splitAdvertisingReportByYear(advertisingReport, startYearTaxParams.year);
  var { startYearStorageData, endYearStorageData } = splitPaidStorageReportByYear(paidStorageReport, startYearTaxParams.year);
  startYearStorageData = parsePaidStorageReport(startYearStorageData);
  endYearStorageData = parsePaidStorageReport(endYearStorageData);
  paidStorageReport = parsePaidStorageReport(paidStorageReport);

  var { startYearWeeklyFinancialReport, endYearWeeklyFinancialReport } = splitWeeklyFinancialReportByYear(
    weeklyFinancialReport,
    startYearTaxParams.year,
  );

  var startYearTotals = {};
  startYearTotals.totalSold = calc.total.sold(startYearWeeklyFinancialReport);
  startYearTotals.totalStorageCost = calc.total.storageCost(startYearWeeklyFinancialReport);
  startYearTotals.totalAdvertisingCosts = calc.totalAdvertisingCosts(startYearAd);

  var endYearTotals = {};
  endYearTotals.totalSold = calc.total.sold(endYearWeeklyFinancialReport);
  endYearTotals.totalStorageCost = calc.total.storageCost(endYearWeeklyFinancialReport);
  endYearTotals.totalAdvertisingCosts = calc.totalAdvertisingCosts(endYearAd);

  var totalSold = startYearTotals.totalSold + endYearTotals.totalSold;
  var totalStorageCost = truncateNum(startYearTotals.totalStorageCost + endYearTotals.totalStorageCost);
  var totalAdvertisingCosts = startYearTotals.totalAdvertisingCosts + endYearTotals.totalAdvertisingCosts;

  var skus = [];
  var skuNamesAndIds = getSkuNamesAndIds(weeklyFinancialReport);
  var skuNamesAndIdsInCurrentYear = getSkuNamesAndIds(startYearWeeklyFinancialReport);
  var skuNamesAndIdsInNextYear = getSkuNamesAndIds(endYearWeeklyFinancialReport);

  for (var { id, name } of skuNamesAndIds) {
    var skuFilteredReport = weeklyFinancialReport.filter((sku) => sku.vendorCode === name);
    var { startYearSku, endYearSku } = splitSkuByYear(skuFilteredReport, startYearTaxParams.year);

    var currentYearPropPostfix = "InCurrentYear";
    var nextYearPropPostfix = "InNextYear";

    var currentYearSkuData = parseSku(
      name,
      skuNamesAndIdsInCurrentYear.length,
      startYearSku,
      startYearStorageData,
      startYearTaxParams.taxRate,
      startYearTotals,
      currentYearPropPostfix,
    );

    var resultOfStartYearRecalculation = recalculateSkuAndTaxParams(
      currentYearSkuData,
      recalculatedTaxParams.startYearTaxParams,
      currentYearPropPostfix,
    );

    var nextYearSkuData = parseSku(
      name,
      skuNamesAndIdsInNextYear.length,
      endYearSku,
      endYearStorageData,
      endYearTaxParams.taxRate,
      endYearTotals,
      nextYearPropPostfix,
    );

    var resultOfEndYearRecalculation = recalculateSkuAndTaxParams(nextYearSkuData, recalculatedTaxParams.endYearTaxParams, nextYearPropPostfix);

    var middleTaxRate = (startYearTaxParams.taxRate + endYearTaxParams.taxRate) / 2;

    var totalSkuData = parseSku(name, totalSold, skuFilteredReport, paidStorageReport, middleTaxRate, {
      totalSold,
      totalStorageCost,
      totalAdvertisingCosts,
    });

    var sku = Object.assign({}, resultOfStartYearRecalculation.updatedSku, resultOfEndYearRecalculation.updatedSku, totalSkuData);
    sku.id = id;
    sku.skuName = name;

    recalculatedTaxParams.startYearTaxParams = resultOfStartYearRecalculation.recalculatedTaxParams;
    recalculatedTaxParams.endYearTaxParams = resultOfEndYearRecalculation.recalculatedTaxParams;

    skus.push(sku);
  }

  skus = truncateSkuNums(skus);

  return { skus, skuNamesAndIds, totalSold, totalStorageCost, totalAdvertisingCosts, recalculatedTaxParams };
};

export default processCrossReportSkus;
