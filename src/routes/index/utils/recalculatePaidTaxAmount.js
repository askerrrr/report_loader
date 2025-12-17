var recalculatePaidTaxAmount = function (report, taxParams, propPostfix = "") {
  taxParams.paidTaxAmount += report["totalTaxAmount" + propPostfix];

  if (taxParams.paidTaxAmount >= 0) {
    taxParams.isInsuranceFeePaid = true;
    taxParams.insuranceFeePercentage = 0;
  }

  return taxParams;
};

module.exports = recalculatePaidTaxAmount;
