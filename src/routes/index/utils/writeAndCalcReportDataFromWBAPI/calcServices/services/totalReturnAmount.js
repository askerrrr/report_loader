var calcTotalReturnAmount = (skus) => skus.reduce((acc, sku) => acc + sku.returnAmountPerSKU, 0);

module.exports = calcTotalReturnAmount;
