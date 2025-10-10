var shortNum = require("../../shortNum");

var calcTaxPerSKU = (retailAmount, taxRate) => {
  if (taxRate === 0) {
    return 0;
  }

  var taxPerSKU = (retailAmount * taxRate) / 100;

  return shortNum(taxPerSKU);
};

module.exports = calcTaxPerSKU;
