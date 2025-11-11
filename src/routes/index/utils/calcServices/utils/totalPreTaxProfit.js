var shortNum = require("../../writeAndCalcReportDataFromWBAPI/shortNum");

var calcTotalPreTaxProfit = (skus) => {
  var totalPreTaxProfit = skus.reduce((acc, sku) => acc + sku.preTaxProfit, 0);

  return shortNum(totalPreTaxProfit);
};

module.exports = calcTotalPreTaxProfit;
