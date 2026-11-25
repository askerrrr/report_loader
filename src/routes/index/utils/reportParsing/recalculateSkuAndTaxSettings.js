import truncateNum from "./truncateNum.js";
import calcInsuranceFee from "../calcServices/utils/insuranceFee.js";

var recalculateSkuAndTaxSettings = (sku, taxSettings) => {
  var updatedTaxSettings = { ...taxSettings };

  // var {
  //   skuAdditionalInsuranceFee,
  //   newTaxRetailAmount,
  //   hasExcessIncomeForInsurance,
  //   requiresAdditionalInsuranceFee,
  // } = recalculateTaxSettingRetailAmountAndSkuAdditionalInsuranceFee(
  //   sku.retailAmount,
  //   taxSettings,
  // );

  // updatedTaxSettings = Object.assign(updatedTaxSettings, {
  //   hasExcessIncomeForInsurance,
  //   requiresAdditionalInsuranceFee,
  //   retailAmount: newTaxRetailAmount,
  // });

  // var {
  //   recalculatedSkuAdditionalInsuranceFee,
  //   newTaxSettingsAdditionalInsuranceFee,
  //   ...restUpdatedTaxSettings
  // } = recalculateInsuranceFee(skuAdditionalInsuranceFee, updatedTaxSettings);

  // updatedTaxSettings = Object.assign(updatedTaxSettings, {
  //   additionalInsuranceFee: newTaxSettingsAdditionalInsuranceFee,
  //   ...restUpdatedTaxSettings,
  // });

  updatedTaxSettings.paidTaxAmount = taxSettings.paidTaxAmount + sku.tax;
  updatedTaxSettings.retailAmount = taxSettings.retailAmount + sku.retailAmount;
  updatedTaxSettings.taxableAmount =
    taxSettings.taxableAmount + sku.taxableAmount;

  return { updatedTaxSettings };
};

export default recalculateSkuAndTaxSettings;

var recalculateTaxSettingRetailAmountAndSkuAdditionalInsuranceFee = function (
  skuRetailAmount,
  taxSettings,
) {
  var prevRetailAmount = taxSettings.retailAmount;
  var newTaxRetailAmount = taxSettings.retailAmount + skuRetailAmount;

  var skuAdditionalInsuranceFee = 0;
  var hasExcessIncomeForInsurance = false;
  var requiresAdditionalInsuranceFee = false;

  if (newTaxRetailAmount > taxSettings.excessIncomeForAdditionalInsuranceFee) {
    hasExcessIncomeForInsurance = true;
    requiresAdditionalInsuranceFee = true;

    var difference =
      taxSettings.excessIncomeForAdditionalInsuranceFee - prevRetailAmount;

    if (difference > 0) {
      difference = skuRetailAmount - difference;
      skuAdditionalInsuranceFee = calcInsuranceFee(
        difference,
        taxSettings.excessInsuranceRate,
      );
    } else {
      skuAdditionalInsuranceFee = calcInsuranceFee(
        skuRetailAmount,
        taxSettings.excessInsuranceRate,
      );
    }
  }

  return {
    skuAdditionalInsuranceFee,
    hasExcessIncomeForInsurance,
    requiresAdditionalInsuranceFee,
    newTaxRetailAmount,
  };
};

var recalculateInsuranceFee = function (
  skuAdditionalInsuranceFee,
  taxSettings,
) {
  var isInsuranceFeePaid = false;
  var mandatoryInsuranceFeeIsPaid = true;
  var additionalInsuranceFeeIsPaid = false;
  var requiresAdditionalInsuranceFee = true;
  var excessInsuranceRate = taxSettings.excessInsuranceRate;
  var insuranceFeePercentage = taxSettings.insuranceFeePercentage;
  var recalculatedSkuAdditionalInsuranceFee = skuAdditionalInsuranceFee;
  var newTaxSettingsAdditionalInsuranceFee =
    taxSettings.additionalInsuranceFee + skuAdditionalInsuranceFee;

  if (!requiresAdditionalInsuranceFee) {
    return {
      isInsuranceFeePaid,
      excessInsuranceRate,
      insuranceFeePercentage,
      mandatoryInsuranceFeeIsPaid,
      additionalInsuranceFeeIsPaid,
      requiresAdditionalInsuranceFee,
      newTaxSettingsAdditionalInsuranceFee,
      recalculatedSkuAdditionalInsuranceFee,
    };
  }

  var prevAdditionalInsuranceFee = taxSettings.additionalInsuranceFee;

  var paidInsuranceFee =
    taxSettings.paidInsuranceFee + newTaxSettingsAdditionalInsuranceFee;
  var maxAdditionalInsuranceFee =
    taxSettings.maxInsuranceFee - taxSettings.mandatoryInsuranceFee;

  if (newTaxSettingsAdditionalInsuranceFee > maxAdditionalInsuranceFee) {
    additionalInsuranceFeeIsPaid = true;
    requiresAdditionalInsuranceFee = false;

    var difference = maxAdditionalInsuranceFee - prevAdditionalInsuranceFee;

    if (difference > 0) {
      var recalculatedSkuAdditionalInsuranceFee =
        skuAdditionalInsuranceFee + difference;
    }
  }

  if (paidInsuranceFee >= taxSettings.maxInsuranceFee) {
    isInsuranceFeePaid = true;
    mandatoryInsuranceFeeIsPaid = true;
    additionalInsuranceFeeIsPaid = true;
    requiresAdditionalInsuranceFee = false;

    excessInsuranceRate = 0;
    insuranceFeePercentage = 0;
  }

  if (newTaxSettingsAdditionalInsuranceFee >= maxAdditionalInsuranceFee) {
    excessInsuranceRate = 0;
    additionalInsuranceFeeIsPaid = true;
    requiresAdditionalInsuranceFee = false;
  }

  return {
    isInsuranceFeePaid,
    excessInsuranceRate,
    insuranceFeePercentage,
    mandatoryInsuranceFeeIsPaid,
    additionalInsuranceFeeIsPaid,
    requiresAdditionalInsuranceFee,
    newTaxSettingsAdditionalInsuranceFee,
    recalculatedSkuAdditionalInsuranceFee,
  };
};
