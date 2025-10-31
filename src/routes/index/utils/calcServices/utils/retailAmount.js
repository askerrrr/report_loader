var calcRetailAmountPerSKU = (sku) => {
  var retailAmount = sku.reduce((acc, i) => acc + i.retail_amount, 0);

  return retailAmount;
};

module.exports = calcRetailAmountPerSKU;
