var calcAverageProfitPerSKU = (sku) => {
  if (sku.profitPerSKU == 0 || sku.qty == 0) {
    return 0;
  }

  var averageProfitPerSKU = sku.profitPerSKU / sku.qty;

  return averageProfitPerSKU;
};

module.exports = calcAverageProfitPerSKU;
