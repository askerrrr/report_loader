var shortNum = require("../../shortNum");

var calcTotalDeliveryCost = (skus) => {
  var totalDeliveryCost = skus.reduce((acc, sku) => acc + sku.deliveryCostPerSKU, 0);
  return shortNum(totalDeliveryCost);
};

module.exports = calcTotalDeliveryCost;
