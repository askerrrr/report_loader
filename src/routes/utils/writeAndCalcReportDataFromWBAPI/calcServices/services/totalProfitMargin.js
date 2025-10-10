var shortNum = require("../../shortNum");

var calcTotalProfitMargin = (totalRetailAmount, totalFinalProfit) => {
  if (totalFinalProfit === 0 || totalRetailAmount === 0) {
    return 0;
  }

  var totalProfitMargin = (totalFinalProfit * 100) / totalRetailAmount;

  return shortNum(totalProfitMargin);
};

module.exports = calcTotalProfitMargin;
