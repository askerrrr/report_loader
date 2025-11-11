var calcTotalPaidAcceptance = (skus) => skus.reduce((acc, sku) => acc + sku.acceptance, 0);

module.exports = calcTotalPaidAcceptance;
