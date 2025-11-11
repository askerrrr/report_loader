var calc = require("../calcServices");
var getSkuNamesAndIds = require("./getSkuNamesAndIds");
var truncateSKUNums = require("./truncateSKUNums");
var parsePaidStorageReport = require("./parsePaidStorageReport");

var parseReports = async (taxRate, reports) => {
  var { weeklyFinancialReport, paidStorageReport, totalAdvertisingCosts } = reports;

  var totalSold = await calc.total.sold(weeklyFinancialReport);
  var totalStorageCost = await calc.total.storageCost(weeklyFinancialReport);

  var skuNamesAndIds = getSkuNamesAndIds(weeklyFinancialReport);

  var storageDataFromPaidStorageReport = await parsePaidStorageReport(paidStorageReport);

  var sku = {};
  var skus = [];

  for (var { id, name } of skuNamesAndIds) {
    var skuFilteredReport = weeklyFinancialReport.filter((sku) => sku.sa_name === name);

    sku.id = id;
    sku.skuName = name;
    sku.qty = await calc.sku.quantity(skuFilteredReport);
    sku.fines = calc.sku.fines(skuFilteredReport);
    sku.acceptance = calc.sku.paidAcceptance(skuFilteredReport);
    sku.retailAmount = calc.sku.retailAmount(skuFilteredReport);
    sku.tax = calc.sku.tax(sku.retailAmount, taxRate);
    sku.returnAmount = calc.sku.returnAmount(skuFilteredReport);
    sku.deliveryCost = calc.sku.deliveryCost(skuFilteredReport);
    sku.deductionOrPayment = calc.sku.deductionsOrPayments(skuFilteredReport);
    sku.additionalPayment = calc.sku.additionalPayment(skuFilteredReport);
    sku.sellerPayoutAmount = calc.sku.sellerPayoutAmount(skuFilteredReport);
    sku.averageRetailPrice = calc.sku.averageRetailPrice(sku.qty, skuFilteredReport);
    sku.storageCost = calc.sku.storageCost(name, storageDataFromPaidStorageReport);
    sku.averageStorageCost = calc.sku.averageStorageCost(totalStorageCost, totalSold, sku.qty);
    sku.averageAdvertisingCost = calc.sku.averageAdvertisingCost(skuNamesAndIds.length, totalAdvertisingCosts);
    sku.profit = calc.sku.profit(sku);
    sku.averageProfit = calc.sku.averageProfit(sku);

    skus.push({ ...sku });
  }

  skus = await truncateSKUNums(skus);

  var totalFines = calc.total.fines(skus);
  var totalProfit = calc.total.profit(skus);
  var totalTaxAmount = calc.total.taxAmount(skus);
  var totalReturnAmount = calc.total.returnAmount(skus);
  var totalDeliveryCost = calc.total.deliveryCost(skus);
  var totalRetailAmount = calc.total.retailAmount(skus);
  var totalPaidAcceptance = calc.total.paidAcceptance(skus);
  var totalAdditionalPayment = calc.total.additionalPayment(skus);
  var totalDeductionOrPayment = calc.total.deductionOrPayment(skus);
  var totalSellerPayoutAmount = calc.total.sellerPayoutAmount(skus);

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
  };

  return { report };
};

module.exports = parseReports;
