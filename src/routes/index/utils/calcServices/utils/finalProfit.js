var shortNum = require("../../writeAndCalcReportDataFromWBAPI/shortNum");

var calcFinalProfitPerSKU = (preTaxProfit, insuranceFee, tax = 0) => {
  var finalProfit = preTaxProfit - insuranceFee - tax;

  return shortNum(finalProfit);
};

module.exports = calcFinalProfitPerSKU;
