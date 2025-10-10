var calcRetailAmountPerSKU = (sku) => {
  var retailAmountPerSKU = sku.reduce((acc, i) => acc + i.retail_amount, 0);

  return retailAmountPerSKU;
};

module.exports = calcRetailAmountPerSKU;
