import calcFinalProfit from "./finalProfit.js";
import calcProfitMargin from "./profitMargin.js";
import calcInsuranceFee from "./insuranceFee.js";
import calcPreTaxProfit from "./preTaxProfit.js";

var calcRestSKUParams = (sku, taxParams, propPostfix = "") => {
  sku["isCostPriceSet" + propPostfix] = true;

  sku["preTaxProfit" + propPostfix] = calcPreTaxProfit(sku, propPostfix);

  var { sku, taxParams } = recalculateInsuranceFee(sku, taxParams, propPostfix);

  if (!sku["finalProfit" + propPostfix]) {
    sku["finalProfit" + propPostfix] = 0;
  }

  var previousSkuFinalProfit = sku["finalProfit" + propPostfix];

  sku["finalProfit" + propPostfix] = calcFinalProfit(sku, propPostfix);

  sku["profitMargin" + propPostfix] = calcProfitMargin(sku["finalProfit" + propPostfix], sku["retailAmount" + propPostfix]);

  taxParams.finalProfit = taxParams.finalProfit - previousSkuFinalProfit + sku["finalProfit" + propPostfix];
  return { updatedTaxParams: taxParams, skuWithCalculatedParams: sku };
};

export default calcRestSKUParams;

var recalculateInsuranceFee = function (sku, taxParams, propPostfix) {
  if (taxParams.mandatoryInsuranceFeeIsPaid) {
    sku["insuranceFee" + propPostfix] = 0;
    sku["isInsuranceFeeIncluded" + propPostfix] = false;

    return { sku, taxParams };
  }

  sku["insuranceFee" + propPostfix] = calcInsuranceFee(sku["preTaxProfit" + propPostfix], taxParams.mandatoryInsuranceFeeRate);
  sku["isInsuranceFeeIncluded" + propPostfix] = true;

  taxParams.paidInsuranceFee += sku["insuranceFee" + propPostfix];

  if (taxParams.paidInsuranceFee >= taxParams.mandatoryInsuranceFee) {
    var difference = taxParams.paidInsuranceFee - taxParams.mandatoryInsuranceFee;

    var newInsuranceFee = sku["insuranceFee" + propPostfix] - difference;
    if (newInsuranceFee === 0) {
      sku["isInsuranceFeeIncluded" + propPostfix] = false;
    }

    sku["insuranceFee" + propPostfix] = newInsuranceFee;

    taxParams.mandatoryInsuranceFeeRate = 0;
    taxParams.mandatoryInsuranceFeeIsPaid = true;
    taxParams.paidInsuranceFee = taxParams.mandatoryInsuranceFee;
  }

  var totalInsuranceFee = taxParams.paidInsuranceFee + taxParams.additionalInsuranceFee;

  if (totalInsuranceFee >= taxParams.maxInsuranceFee) {
    taxParams.excessInsuranceRate = 0;
    taxParams.insuranceFeeIsPaid = true;
    taxParams.mandatoryInsuranceFeeRate = 0;
    taxParams.mandatoryInsuranceFeeIsPaid = true;
    taxParams.additionalInsuranceFeeIsPaid = true;
    taxParams.requiresAdditionalInsuranceFee = false;
  }

  return { sku, taxParams };
};
