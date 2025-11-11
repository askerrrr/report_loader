var shortNum = require("../../writeAndCalcReportDataFromWBAPI/shortNum");

var calcProfitMargin = ({ finalProfit, retailAmount }) => {
  if (finalProfit === 0) {
    return 0;
  }

  var profitMargin = (finalProfit * 100) / retailAmount;

  return shortNum(profitMargin);
};

module.exports = calcProfitMargin;
