var shortNum = require("../../shortNum");

var calcTotalSellerPayoutAmount = (skus) => {
  var totalSellerPayoutAmount = skus.reduce((acc, sku) => acc + sku.sellerPayoutAmountPerSKU, 0);

  return shortNum(totalSellerPayoutAmount);
};

module.exports = calcTotalSellerPayoutAmount;
