var calcAverageRetailPricePerItem = (quantity, sku) => {
  var allRetailPricesZero = sku.every((e) => e.retail_price === 0);

  if (allRetailPricesZero) {
    return 0;
  }

  var retailPrices = sku.reduce((acc, e) => acc + e.retail_price, 0);

  var averageRetailPrice = retailPrices / quantity;

  return averageRetailPrice;
};

module.exports = calcAverageRetailPricePerItem;
