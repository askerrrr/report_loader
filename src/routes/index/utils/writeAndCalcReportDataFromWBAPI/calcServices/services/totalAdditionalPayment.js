var calcTotalAdditionalPayment = (skus) => skus.reduce((acc, sku) => acc + sku.additionalPaymentPerSKU, 0);

module.exports = calcTotalAdditionalPayment;
