var calcTotalPaidAcceptance = (skus) => skus.reduce((acc, sku) => acc + sku.acceptancePerSKU, 0);

module.exports = calcTotalPaidAcceptance;
