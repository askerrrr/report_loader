var truncateNum = require("../../reportParsing/truncateNum");

var calcFinalProfit = (preTaxProfit, insuranceFee, tax = 0, additionalInsuranceFee = 0) => {
  var finalProfit = preTaxProfit - insuranceFee - tax - additionalInsuranceFee;
  return truncateNum(finalProfit);
};

module.exports = calcFinalProfit;
