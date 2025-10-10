var calcReturnAmountPerSKU = (sku) => sku.reduce((acc, i) => acc + i.return_amount, 0);

module.exports = calcReturnAmountPerSKU;
