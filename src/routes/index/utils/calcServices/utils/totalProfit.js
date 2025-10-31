var calcTotalProfit = (skus) => skus.reduce((acc, sku) => acc + sku.profit, 0);

module.exports = calcTotalProfit;
