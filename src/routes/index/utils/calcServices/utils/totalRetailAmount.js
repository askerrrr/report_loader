var calcTotalRetailAmount = (skus) => skus.reduce((acc, sku) => acc + sku.retailAmount, 0);

module.exports = calcTotalRetailAmount;
