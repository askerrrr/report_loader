var calcAverageProfit = (sku, propPostfix = "") => {
  if (sku["profit" + propPostfix] == 0 || sku["qty" + propPostfix] == 0) {
    return 0;
  }

  var averageProfit = sku["profit" + propPostfix] / sku["qty" + propPostfix];

  return averageProfit;
};

module.exports = calcAverageProfit;
