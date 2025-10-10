const shortNum = require("../../shortNum");

var calcTotalFinalProfit = (skus) => {
  var totalFinalProfit = skus.reduce((acc, sku) => acc + sku.finalProfitPerSKU, 0);

  return shortNum(totalFinalProfit);
};

module.exports = calcTotalFinalProfit;
