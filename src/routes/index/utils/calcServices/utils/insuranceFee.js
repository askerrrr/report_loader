var shortNum = require("../../writeAndCalcReportDataFromWBAPI/shortNum");

var calcInsuranceFeePerSKU = (preTaxProfit, insuranceFeePercentage) => {
  if (insuranceFeePercentage == 0) {
    return 0;
  }

  var insuranceFee = (preTaxProfit * insuranceFeePercentage) / 100;

  return shortNum(insuranceFee);
};

module.exports = calcInsuranceFeePerSKU;
