var shortNum = require("../../writeAndCalcReportDataFromWBAPI/shortNum");

var calcTotalFinalProfit = (skus) => {
  var totalFinalProfit = skus.reduce((acc, sku) => acc + sku.finalProfit, 0);

  return shortNum(totalFinalProfit);
};

module.exports = calcTotalFinalProfit;
