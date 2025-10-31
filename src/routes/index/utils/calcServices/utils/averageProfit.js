var calcAverageProfitPerSKU = (sku) => {
  if (sku.profit == 0 || sku.qty == 0) {
    return 0;
  }

  var averageProfit = sku.profit / sku.qty;

  return averageProfit;
};

module.exports = calcAverageProfitPerSKU;
