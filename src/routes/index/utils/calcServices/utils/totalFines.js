var calcTotalFines = (skus) => skus.reduce((acc, sku) => acc + sku.fines, 0);

module.exports = calcTotalFines;
