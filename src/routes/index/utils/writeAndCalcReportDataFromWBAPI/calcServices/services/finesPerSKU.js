var calcFinesPerSKU = (sku) => {
  var totalFinesPerSKU = sku.reduce((acc, i) => acc + i.penalty, 0);

  return totalFinesPerSKU;
};

module.exports = calcFinesPerSKU;
