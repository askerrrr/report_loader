var shortNum = require("../../shortNum");

var calcTotalPreTaxProfit = (skus) => {
  var totalPreTaxProfit = skus.reduce((acc, sku) => acc + sku.preTaxProfitPerSKU, 0);

  return shortNum(totalPreTaxProfit);
};

module.exports = calcTotalPreTaxProfit;
