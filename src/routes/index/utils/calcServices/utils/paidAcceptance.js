var calcPaidAcceptancePerSKU = (sku) => {
  var acceptance = sku.reduce((acc, i) => acc + i.acceptance, 0);

  return acceptance;
};

module.exports = calcPaidAcceptancePerSKU;
