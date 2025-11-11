var calcTotalReturnAmount = (skus) => skus.reduce((acc, sku) => acc + sku.returnAmount, 0);

module.exports = calcTotalReturnAmount;
