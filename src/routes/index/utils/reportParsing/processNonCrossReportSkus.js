var parseSku = require("./parseSku");
var calc = require("../calcServices");
var truncateSkuNums = require("./truncateSkuNums");
var getSkuNamesAndIds = require("./getSkuNamesAndIds");
var parsePaidStorageReport = require("./parsePaidStorageReport");
var recalculateSkuAndTaxParams = require("./recalculateSkuAndTaxParams");

var processNonCrossReportSkus = async (reports, taxParams) => {
  var skus = [];
  var recalculatedTaxParams = Object.assign({}, taxParams);
  var { weeklyFinancialReport, paidStorageReport, advertisingReport } = reports;

  var totalSold = await calc.total.sold(weeklyFinancialReport);
  var totalStorageCost = await calc.total.storageCost(weeklyFinancialReport);
  var totalAdvertisingCosts = await calculateTotalAdvertisingCosts(advertisingReport);
  var totals = { totalSold, totalStorageCost, totalAdvertisingCosts };

  var skuNamesAndIds = getSkuNamesAndIds(weeklyFinancialReport);

  var storageDataFromPaidStorageReport = await parsePaidStorageReport(paidStorageReport);

  for (var { id, name } of skuNamesAndIds) {
    var skuFilteredReport = weeklyFinancialReport.filter((sku) => sku.sa_name === name);

    var sku = await parseSku(name, skuNamesAndIds.length, skuFilteredReport, storageDataFromPaidStorageReport, taxParams.taxRate, totals);

    sku.id = id;
    sku.skuName = name;

    var result = recalculateSkuAndTaxParams(sku, recalculatedTaxParams);

    recalculatedTaxParams = result.recalculatedTaxParams;
    skus.push(result.updatedSku);
  }

  skus = await truncateSkuNums(skus);

  return { skus, recalculatedTaxParams, skuNamesAndIds, ...totals };
};

module.exports = processNonCrossReportSkus;

var calculateTotalAdvertisingCosts = async function (data) {
  return data.reduce((acc, i) => acc + i.updSum, 0);
};
