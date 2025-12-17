var calcFinalProfit = require("./finalProfit");
var calcProfitMargin = require("./profitMargin");
var calcInsuranceFee = require("./insuranceFee");
var calcPreTaxProfit = require("./preTaxProfit");

var calcRestSKUParams = (sku, taxParams, propPostfix = "") => {
  sku["preTaxProfit" + propPostfix] = calcPreTaxProfit(sku["qty" + propPostfix], sku["profit" + propPostfix], sku.costPrice);
  sku["finalProfit" + propPostfix] = calcFinalProfit(sku["preTaxProfit" + propPostfix], 0, sku["tax" + propPostfix]);

  // if (taxParams.isInsuranceFeePaid) {
  //   sku["insuranceFee" + propPostfix] = 0;
  //   sku["isInsuranceFeeIncluded" + propPostfix] = false;

  //   sku["finalProfit" + propPostfix] = calcFinalProfit(
  //     sku["preTaxProfit" + propPostfix],
  //     sku["insuranceFee" + propPostfix],
  //     sku["tax" + propPostfix]
  //   );
  // } else {
  //   sku["isInsuranceFeeIncluded" + propPostfix] = true;
  //   sku["previousInsuranceFee" + propPostfix] = sku["insuranceFee" + propPostfix] ?? 0;

  //   sku["insuranceFee" + propPostfix] = calcInsuranceFee(sku["preTaxProfit" + propPostfix], taxParams.insuranceFeePercentage);

  //   taxParams.paidInsuranceFee = taxParams.paidInsuranceFee - sku["previousInsuranceFee" + propPostfix] + sku["insuranceFee" + propPostfix];

  //   if (taxParams.paidInsuranceFee >= taxParams.mandatoryInsuranceFee) {
  //     taxParams.isInsuranceFeePaid = true;
  //     taxParams.insuranceFeePercentage = 0;
  //     taxParams.paidInsuranceFee = taxParams.mandatoryInsuranceFee;

  //     sku["insuranceFee" + propPostfix] = 0;
  //     sku["isInsuranceFeeIncluded" + propPostfix] = false;
  //     sku["finalProfit" + propPostfix] = calcFinalProfit(
  //       sku["preTaxProfit" + propPostfix],
  //       sku["insuranceFee" + propPostfix],
  //       sku["tax" + propPostfix]
  //     );
  //   } else {
  //     sku["tax" + propPostfix] = 0;

  //     sku["finalProfit" + propPostfix] = calcFinalProfit(
  //       sku["preTaxProfit" + propPostfix],
  //       sku["insuranceFee" + propPostfix],
  //       sku["tax" + propPostfix]
  //     );
  //   }
  // }

  sku["isCostPriceSet" + propPostfix] = true;
  sku["profitMargin" + propPostfix] = calcProfitMargin(sku["finalProfit" + propPostfix], sku["retailAmount" + propPostfix]);

  return { updatedTaxParams: taxParams, skuWithCalculatedParams: sku };
};

module.exports = calcRestSKUParams;
