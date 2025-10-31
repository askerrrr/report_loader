var calcAdditionalPaymentPerSKU = (sku) => sku.reduce((acc, i) => acc + i.additional_payment, 0);

module.exports = calcAdditionalPaymentPerSKU;
