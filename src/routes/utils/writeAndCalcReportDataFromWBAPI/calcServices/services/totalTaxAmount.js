var shortNum = require("../../shortNum");

var calcTotalTaxAmount = (skus) => {
  var totalTaxAmount = skus.reduce((acc, sku) => acc + sku.taxPerSKU, 0);

  return shortNum(totalTaxAmount);
};

module.exports = calcTotalTaxAmount;
