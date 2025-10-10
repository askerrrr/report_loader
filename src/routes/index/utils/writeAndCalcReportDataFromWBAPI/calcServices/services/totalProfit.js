var calcTotalProfit = (skus) => skus.reduce((acc, sku) => acc + sku.profitPerSKU, 0);

module.exports = calcTotalProfit;
