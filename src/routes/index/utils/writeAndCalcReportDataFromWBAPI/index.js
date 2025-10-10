var calc = require("./calcServices");
var getSkuNamesAndIds = require("./getSkuNamesAndIds");
var truncateSKUNums = require("./truncateSKUNums");
var parsePaidStorageReport = require("./parsePaidStorageReport");

var parseReports = async (taxRate, reports) => {
  var { mainReport, paidStorageReport, totalAdvertisingCosts } = reports;

  var totalSold = await calc.totalSold(mainReport);
  var totalStorageCost = await calc.totalStorageCost(mainReport);

  var skuNamesAndIds = getSkuNamesAndIds(mainReport);

  var storageDataFromPaidStorageReport = await parsePaidStorageReport(paidStorageReport);

  var sku = {};
  var skus = [];

  for (var { id, name } of skuNamesAndIds) {
    var skuFilteredReport = mainReport.filter((sku) => sku.sa_name === name);

    sku.id = id;
    sku.skuName = name;
    sku.costPrice = 0;
    sku.revenuePerSKU = 0;
    sku.profitMargin = 0;
    sku.finalProfitPerSKU = 0;
    sku.preTaxProfitPerSKU = 0;
    sku.isCostPriceSet = false;
    sku.isInsuranceFeeIncluded = false;
    sku.qty = await calc.quantityPerSKU(skuFilteredReport);
    sku.finesPerSKU = calc.finesPerSKU(skuFilteredReport);
    sku.acceptancePerSKU = calc.acceptancePerSKU(skuFilteredReport);
    sku.retailAmountPerSKU = calc.retailAmountPerSKU(skuFilteredReport);
    sku.taxPerSKU = calc.taxPerSKU(sku.retailAmountPerSKU, taxRate);
    sku.returnAmountPerSKU = calc.returnAmountPerSKU(skuFilteredReport);
    sku.deliveryCostPerSKU = calc.deliveryCostPerSKU(skuFilteredReport);
    sku.deductionOrPayment = calc.deductionsOrPayments(skuFilteredReport);
    sku.additionalPaymentPerSKU = calc.additionalPaymentPerSKU(skuFilteredReport);
    sku.sellerPayoutAmountPerSKU = calc.sellerPayoutAmountPerSKU(skuFilteredReport);
    sku.averageRetailPrice = calc.averageRetailPricePerSKU(sku.qty, skuFilteredReport);
    sku.storageCostPerSKU = calc.storageCostPerSKU(name, storageDataFromPaidStorageReport);
    sku.averageStorageCost = calc.averageStorageCostPerSKU(totalStorageCost, totalSold, sku.qty);
    sku.averageAdvertisingCostPerSKU = calc.averageAdvertisingCostPerSKU(skuNamesAndIds.length, totalAdvertisingCosts);
    sku.profitPerSKU = calc.profitPerSKU(sku);
    sku.averageProfitPerSKU = calc.averageProfitPerSKU(sku);

    skus.push({ ...sku });
  }

  skus = await truncateSKUNums(skus);

  var totalFines = calc.totalFines(skus);
  var totalProfit = calc.totalProfit(skus);
  var totalTaxAmount = calc.totalTaxAmount(skus);
  var totalReturnAmount = calc.totalReturnAmount(skus);
  var totalDeliveryCost = calc.totalDeliveryCost(skus);
  var totalRetailAmount = calc.totalRetailAmount(skus);
  var totalPaidAcceptance = calc.totalPaidAcceptance(skus);
  var totalAdditionalPayment = calc.totalAdditionalPayment(skus);
  var totalDeductionOrPayment = calc.totalDeductionOrPayment(skus);
  var totalSellerPayoutAmount = calc.totalSellerPayoutAmount(skus);

  var report = {
    skus,
    totalSold,
    totalFines,
    totalSellerPayoutAmount,
    totalTaxAmount,
    totalProfit,
    totalStorageCost,
    totalDeliveryCost,
    totalReturnAmount,
    totalRetailAmount,
    totalPaidAcceptance,
    totalAdvertisingCosts,
    totalAdditionalPayment,
    totalDeductionOrPayment,
    totalProductCosts: 0,
    tolalInsuranceFee: 0,
    totalPreTaxProfit: 0,
    totalFinalProfit: 0,
    totalProfitMargin: 0,
  };

  return { report, skuNamesAndIds };
};

module.exports = parseReports;
