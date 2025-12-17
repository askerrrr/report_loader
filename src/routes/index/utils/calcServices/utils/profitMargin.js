var truncateNum = require("../../reportParsing/truncateNum");

var calcProfitMargin = (finalProfit, retailAmount) => {
  if (finalProfit === 0) {
    return 0;
  }

  var profitMargin = (finalProfit * 100) / retailAmount;
  return truncateNum(profitMargin);
};

module.exports = calcProfitMargin;
