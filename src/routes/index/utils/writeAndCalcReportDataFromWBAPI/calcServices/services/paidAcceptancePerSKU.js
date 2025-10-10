var calcPaidAcceptancePerSKU = (sku) => {
  var acceptancePerSKU = sku.reduce((acc, i) => acc + i.acceptance, 0);

  return acceptancePerSKU;
};

module.exports = calcPaidAcceptancePerSKU;
