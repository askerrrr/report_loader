var calcTotalAdditionalPayment = (skus) => skus.reduce((acc, sku) => acc + sku.additionalPayment, 0);

module.exports = calcTotalAdditionalPayment;
