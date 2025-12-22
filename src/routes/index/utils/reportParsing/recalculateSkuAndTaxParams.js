var calcInsuranceFee = require("../calcServices/utils/insuranceFee");

var recalculateSkuAndTaxParams = (sku, taxParams, skuPropPostfix = "") => {
  var { sku, taxParams } = recalculateRetailAmount(sku, taxParams, skuPropPostfix);
  var { sku, taxParams } = recalculateInsuranceFee(sku, taxParams, skuPropPostfix);
  var { sku, taxParams } = recalculatePaidTaxAmount(sku, taxParams, skuPropPostfix);

  return { updatedSku: sku, recalculatedTaxParams: taxParams };
};

module.exports = recalculateSkuAndTaxParams;

var recalculateRetailAmount = function (sku, taxParams, skuPropPostfix) {
  var oldRetailAmount = taxParams.retailAmount;
  taxParams.retailAmount += sku["retailAmount" + skuPropPostfix];

  if (taxParams.retailAmount > taxParams.excessIncomeForAdditionalInsuranceFee) {
    taxParams.hasExcessIncomeForInsurance = true;
    taxParams.requiresAdditionalInsuranceFee = true;

    var difference = taxParams.excessIncomeForInsurance - oldRetailAmount;

    if (difference > 0) {
      difference = sku["retailAmount" + skuPropPostfix] - difference;
      sku["additionalInsuranceFee" + skuPropPostfix] = calcInsuranceFee(
        difference,
        taxParams.excessInsuranceRate
      );
    } else {
      sku["additionalInsuranceFee" + skuPropPostfix] = calcInsuranceFee(
        sku["retailAmount" + skuPropPostfix],
        taxParams.excessInsuranceRate
      );
    }
  } else {
    sku["additionalInsuranceFee" + skuPropPostfix] = 0;
  }

  return { sku, taxParams };
};

var recalculateInsuranceFee = function (sku, taxParams, skuPropPostfix) {
  if (!taxParams.requiresAdditionalInsuranceFee) {
    return { sku, taxParams };
  }

  var oldAdditionalInsuranceFee = taxParams.additionalInsuranceFee;
  taxParams.additionalInsuranceFee += sku.additionalInsuranceFee;

  var paidInsuranceFee = taxParams.paidInsuranceFee + taxParams.additionalInsuranceFee;
  var maxAdditionalInsuranceFee = taxParams.maxInsuranceFee - taxParams.mandatoryInsuranceFee;

  if (taxParams.additionalInsuranceFee > maxAdditionalInsuranceFee) {
    taxParams.additionalInsuranceFeeIsPaid = true;
    taxParams.requiresAdditionalInsuranceFee = false;

    var difference = maxAdditionalInsuranceFee - oldAdditionalInsuranceFee;

    if (difference > 0) {
      var recalculatedSkuAdditionalInsuranceFee =
        sku["additionalInsuranceFee" + skuPropPostfix] + difference;
      sku["additionalInsuranceFee" + skuPropPostfix] = recalculatedSkuAdditionalInsuranceFee;
    }
  }

  if (paidInsuranceFee >= taxParams.maxInsuranceFee) {
    taxParams.isInsuranceFeeIsPaid = true;
    taxParams.mandatoryInsuranceFeeIsPaid = true;
    taxParams.additionalInsuranceFeeIsPaid = true;
    taxParams.requiresAdditionalInsuranceFee = false;

    taxParams.excessInsuranceRate = 0;
    taxParams.insuranceFeePercentage = 0;
  }

  if (taxParams.additionalInsuranceFee >= maxAdditionalInsuranceFee) {
    taxParams.excessInsuranceRate = 0;
    taxParams.additionalInsuranceFeeIsPaid = true;
    taxParams.requiresAdditionalInsuranceFee = false;
  }

  return { sku, taxParams };
};

var recalculatePaidTaxAmount = function (sku, taxParams, skuPropPostfix) {
  taxParams.paidTaxAmount += sku["tax" + skuPropPostfix];

  // if (taxParams.paidTaxAmount <= 0) {
  //   sku["tax" + skuPropPostfix] = 0;
  // } else {
  //   var difference = taxParams.paidTaxAmount - sku["tax" + skuPropPostfix];

  //   if (difference < 0) {
  //     sku["tax" + skuPropPostfix] += difference;
  //   }
  // }

  return { sku, taxParams };
};
