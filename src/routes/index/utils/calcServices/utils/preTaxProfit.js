var truncateNum = require("../../reportParsing/truncateNum");

var calcPreTaxProfit = (qty, profit, costPrice) => {
  if (profit === 0 || qty === 0) {
    return 0;
  }

  var preTaxProfit = profit - qty * costPrice;
  return truncateNum(preTaxProfit);
};

module.exports = calcPreTaxProfit;
