var calcTotalSold = require("./services/totalSold");
var calcTaxPerSKU = require("./services/taxPerSKU");
var calcTotalFines = require("./services/totalFines");
var calcTotalProfit = require("./services/totalProfit");
var calcFinesPerSKU = require("./services/finesPerSKU");
var calcProfitPerSKU = require("./services/profitPerSKU");
var calcTotalTaxAmount = require("./services/totalTaxAmount");
var calcProfitMargin = require("./services/profitMargin");
var calcQuantityPerSKU = require("./services/quantityPerSKU");
var calcTotalStorageCost = require("./services/totalStorageCost");
var caclReturnAmountPerSKU = require("./services/returnAmountPerSKU");
var calcTotalDeliveryCost = require("./services/totalDeliveryCost");
var calcTotalRetailAmount = require("./services/totalRetailAmount");
var calcStorageCostPerSKU = require("./services/storageCostPerSKU");
var calcTotalReturnAmount = require("./services/totalReturnAmount");
var calcInsuranceFeePerSKU = require("./services/insuranceFeePerSKU");
var calcTotalPaidAcceptance = require("./services/totalPaidAcceptance");
var calcSellerPayoutAmountPerSKU = require("./services/sellerPayoutAmountPerSKU");
var calcDeliveryCostPerSKU = require("./services/deliveryCostPerSKU");
var calcRetailAmountPerSKU = require("./services/retailAmountPerSKU");
var calcDeductionsOrPayments = require("./services/deductionsOrPayments");
var calcTotalProfitMargin = require("./services/totalProfitMargin");
var calcPaidAcceptancePerSKU = require("./services/paidAcceptancePerSKU");
var calcFinalProfitPerSKU = require("./services/finalProfitPerSKU");
var calcAverageProfitPerSKU = require("./services/averageProfitPerSKU");
var calcAdditionalPaymentPerSKU = require("./services/additionalPaymentPerSKU");
var calcTotalDeductionOrPayment = require("./services/totalDeductionOrPayment");
var calcAverageRetailPricePerSKU = require("./services/averageRetailPricePerSKU");
var calcAverageStorageCostPerSKU = require("./services/averageStorageCostPerSKU");
var calcTotalSellerPayoutAmount = require("./services/totalSellerPayoutAmount");
var caclAverageAdvertisingCostPerSKU = require("./services/averageAdvertisingCostPerSKU");
var calcTotalAdditionalPayment = require("./services/totalAdditionalPayment");

var calc = {
  profitMargin: (revenuePerSKU, finalProfitPerSKU) => calcProfitMargin(revenuePerSKU, finalProfitPerSKU),

  storageCostPerSKU: (skusName, storageData) => calcStorageCostPerSKU(skusName, storageData),

  acceptancePerSKU: (skusName, report) => calcPaidAcceptancePerSKU(skusName, report),

  retailAmountPerSKU: (skusName, report) => calcRetailAmountPerSKU(skusName, report),

  deductionsOrPayments: (report) => calcDeductionsOrPayments(report),

  additionalPaymentPerSKU: (sku) => calcAdditionalPaymentPerSKU(sku),

  returnAmountPerSKU: (sku) => caclReturnAmountPerSKU(sku),

  profitPerSKU: (sku) => calcProfitPerSKU(sku),

  insuranceFeePerSKU: (finalProfitPerSKU, insuranceFeePercentage) => calcInsuranceFeePerSKU(finalProfitPerSKU, insuranceFeePercentage),

  averageAdvertisingCostPerSKU: (totalSKUs, totalAdCampaignCosts) => caclAverageAdvertisingCostPerSKU(totalSKUs, totalAdCampaignCosts),

  taxPerSKU: (retailAmount, taxRate) => calcTaxPerSKU(retailAmount, taxRate),

  quantityPerSKU: (report) => calcQuantityPerSKU(report),

  finesPerSKU: (data, skusName) => calcFinesPerSKU(data, skusName),

  totalSold: (report) => calcTotalSold(report),

  totalFines: (skus) => calcTotalFines(skus),

  totalSellerPayoutAmount: (skus) => calcTotalSellerPayoutAmount(skus),

  totalReturnAmount: (skus) => calcTotalReturnAmount(skus),

  totalProfit: (skus) => calcTotalProfit(skus),

  totalDeliveryCost: (skus) => calcTotalDeliveryCost(skus),

  totalStorageCost: (report) => calcTotalStorageCost(report),

  totalRetailAmount: (skus) => calcTotalRetailAmount(skus),

  totalTaxAmount: (skus) => calcTotalTaxAmount(skus),

  totalProfitMargin: (totalSellerPayoutAmount, totalFinalProfit) => calcTotalProfitMargin(totalSellerPayoutAmount, totalFinalProfit),

  totalDeductionOrPayment: (skus) => calcTotalDeductionOrPayment(skus),

  totalAdditionalPayment: (skus) => calcTotalAdditionalPayment(skus),

  sellerPayoutAmountPerSKU: (sku) => calcSellerPayoutAmountPerSKU(sku),

  totalPaidAcceptance: (skus) => calcTotalPaidAcceptance(skus),

  deliveryCostPerSKU: (data, skusName) => calcDeliveryCostPerSKU(data, skusName),

  averageProfitPerSKU: (sku) => calcAverageProfitPerSKU(sku),

  finalProfitPerSKU: (profitPerSKU, costPrice, qty) => calcFinalProfitPerSKU(profitPerSKU, costPrice, qty),

  averageStorageCostPerSKU: (totalStorageCost, totalSold, qty) => calcAverageStorageCostPerSKU(totalStorageCost, totalSold, qty),

  averageRetailPricePerSKU: (data, quantity, skusName) => calcAverageRetailPricePerSKU(data, quantity, skusName),
};

module.exports = calc;
