var parseSku = require("./parseSku");
var calc = require("../calcServices");
var splitSkuByYear = require("./splitSkuByYear");
var truncateSkuNums = require("./truncateSkuNums");
var getSkuNamesAndIds = require("./getSkuNamesAndIds");
var parsePaidStorageReport = require("./parsePaidStorageReport");
var recalculateSkuAndTaxParams = require("./recalculateSkuAndTaxParams");
var splitPaidStorageReportByYear = require("./splitPaidStorageReportByYear");
var splitAdvertisingReportByYear = require("./splitAdvertisingReportByYear");
var splitWeeklyFinancialReportByYear = require("./splitWeeklyFinancialReportByYear");

var calculateTotalAdvertisingCosts = async (data) => data.reduce((acc, i) => acc + i.updSum, 0);

var processCrossReportSkus = async (reports, taxParams) => {
  var recalculatedTaxParams = {};
  recalculatedTaxParams.startYearTaxParams = Object.assign({}, taxParams.startYearTaxParams);
  recalculatedTaxParams.endYearTaxParams = Object.assign({}, taxParams.endYearTaxParams);

  var { endYearTaxParams, startYearTaxParams } = recalculatedTaxParams;

  var { weeklyFinancialReport, paidStorageReport, advertisingReport } = reports;

  var { startYearAd, endYearAd } = await splitAdvertisingReportByYear(advertisingReport, startYearTaxParams.year);
  var { startYearStorageData, endYearStorageData } = await splitPaidStorageReportByYear(paidStorageReport, startYearTaxParams.year);
  startYearStorageData = await parsePaidStorageReport(startYearStorageData);
  endYearStorageData = await parsePaidStorageReport(endYearStorageData);
  paidStorageReport = await parsePaidStorageReport(paidStorageReport);

  var { startYearWeeklyFinancialReport, endYearWeeklyFinancialReport } = await splitWeeklyFinancialReportByYear(
    weeklyFinancialReport,
    startYearTaxParams.year
  );

  var startYearTotals = {};
  startYearTotals.totalSold = await calc.total.sold(startYearWeeklyFinancialReport);
  startYearTotals.totalStorageCost = await calc.total.storageCost(startYearWeeklyFinancialReport);
  startYearTotals.totalAdvertisingCosts = await calculateTotalAdvertisingCosts(startYearAd);

  var endYearTotals = {};
  endYearTotals.totalSold = await calc.total.sold(endYearWeeklyFinancialReport);
  endYearTotals.totalStorageCost = await calc.total.storageCost(endYearWeeklyFinancialReport);
  endYearTotals.totalAdvertisingCosts = await calculateTotalAdvertisingCosts(endYearAd);

  var totalSold = startYearTotals.totalSold + endYearTotals.totalSold;
  var totalStorageCost = startYearTotals.totalStorageCost + endYearTotals.totalStorageCost;
  var totalAdvertisingCosts = startYearTotals.totalAdvertisingCosts + endYearTotals.totalAdvertisingCosts;

  var skus = [];
  var skuNamesAndIds = getSkuNamesAndIds(weeklyFinancialReport);
  var skuNamesAndIdsInCurrentYear = getSkuNamesAndIds(startYearWeeklyFinancialReport);
  var skuNamesAndIdsInNextYear = getSkuNamesAndIds(endYearWeeklyFinancialReport);

  for (var { id, name } of skuNamesAndIds) {
    var skuFilteredReport = weeklyFinancialReport.filter((sku) => sku.sa_name === name);
    var { startYearSku, endYearSku } = splitSkuByYear(skuFilteredReport, startYearTaxParams.year);

    var currentYearPropPostfix = "InCurrentYear";
    var nextYearPropPostfix = "InNextYear";

    var currentYearSkuData = await parseSku(
      name,
      skuNamesAndIdsInCurrentYear.length,
      startYearSku,
      startYearStorageData,
      startYearTaxParams.taxRate,
      startYearTotals,
      currentYearPropPostfix
    );

    var resultOfStartYearRecalculation = recalculateSkuAndTaxParams(
      currentYearSkuData,
      recalculatedTaxParams.startYearTaxParams,
      currentYearPropPostfix
    );

    var nextYearSkuData = await parseSku(
      name,
      skuNamesAndIdsInNextYear.length,
      endYearSku,
      endYearStorageData,
      endYearTaxParams.taxRate,
      endYearTotals,
      nextYearPropPostfix
    );

    var resultOfEndYearRecalculation = recalculateSkuAndTaxParams(nextYearSkuData, recalculatedTaxParams.endYearTaxParams, nextYearPropPostfix);

    var middleTaxRate = (startYearTaxParams.taxRate + endYearTaxParams.taxRate) / 2;

    var totalSkuData = await parseSku(name, totalSold, skuFilteredReport, paidStorageReport, middleTaxRate, {
      totalSold,
      totalStorageCost,
      totalAdvertisingCosts,
    });

    var sku = Object.assign({}, resultOfStartYearRecalculation.updatedSku, resultOfEndYearRecalculation.updatedSku, totalSkuData);
    sku.id = id;
    sku.skuName = name;

    recalculatedTaxParams.startYearTaxParams = resultOfStartYearRecalculation.recalculatedTaxParams;
    recalculatedTaxParams.endYearTaxParams = resultOfStartYearRecalculation.recalculatedTaxParams;

    skus.push(sku);
  }

  skus = await truncateSkuNums(skus);

  return { skus, skuNamesAndIds, totalSold, totalStorageCost, totalAdvertisingCosts, recalculatedTaxParams };
};

module.exports = processCrossReportSkus;
