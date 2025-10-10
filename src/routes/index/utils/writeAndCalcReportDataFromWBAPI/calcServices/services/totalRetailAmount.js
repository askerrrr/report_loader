var calcTotalRetailAmount = (skus) => skus.reduce((acc, sku) => acc + sku.retailAmountPerSKU, 0);

module.exports = calcTotalRetailAmount;
