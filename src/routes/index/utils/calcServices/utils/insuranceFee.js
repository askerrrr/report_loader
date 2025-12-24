var truncateNum = require("../../reportParsing/truncateNum");

var calcInsuranceFee = (preTaxProfit, insuranceFeePercentage) => {
  if (insuranceFeePercentage == 0) {
    return 0;
  }

  var insuranceFee = (preTaxProfit * insuranceFeePercentage) / 100;

  return truncateNum(insuranceFee);
};

module.exports = calcInsuranceFee;
