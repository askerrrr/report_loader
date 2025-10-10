var shortNum = require("../../shortNum");
var calcProfitMargin = require("./profitMargin");
var calcFinalProfitPerSKU = require("./finalProfitPerSKU");
var calcInsuranceFeePerSKU = require("./insuranceFeePerSKU");
var calcPreTaxProfitPerSKU = require("./preTaxProfitPerSKU");

var calcRestSKUParams = (sku, costPrice, taxParams) => {
  sku.preTaxProfitPerSKU = calcPreTaxProfitPerSKU(sku, costPrice);

  var { insuranceFeePercentage, paidTaxAmount, mandatoryInsuranceFee } = taxParams;

  var newInsuranceFee = calcInsuranceFeePerSKU(sku.preTaxProfitPerSKU, insuranceFeePercentage);

  var isInsuranceFeeIncluded = true;

  // if (paidTaxAmount >= mandatoryInsuranceFee) {
  //   insuranceFeePercentage = 0;
  //   isInsuranceFeeIncluded = false;

  //   finalProfitPerSKU = calcFinalProfitPerSKU(preTaxProfitPerSKU, 0, sku.taxPerSKU);
  // } else {
  //   finalProfitPerSKU = calcFinalProfitPerSKU(preTaxProfitPerSKU, newInsuranceFee);
  // }

  sku.isCostPriceSet = true;
  sku.insuranceFee = newInsuranceFee;
  sku.isInsuranceFeeIncluded = isInsuranceFeeIncluded;
  sku.finalProfitPerSKU = calcFinalProfitPerSKU(sku.preTaxProfitPerSKU, 0, sku.taxPerSKU);
  sku.profitMargin = calcProfitMargin(sku);

  var recalculatedPaidInsuranceFee = mandatoryInsuranceFee - sku.insuranceFee + newInsuranceFee;

  return { recalculatedPaidInsuranceFee, insuranceFeePercentage, skuWithCalculatedParams: sku };
};

module.exports = calcRestSKUParams;
