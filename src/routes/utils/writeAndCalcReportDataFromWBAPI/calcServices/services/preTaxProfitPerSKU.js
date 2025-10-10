var shortNum = require("../../shortNum");

var calcPreTaxProfitPerSKU = ({ qty, profitPerSKU }, costPrice) => {
  if (profitPerSKU === 0 || qty === 0) {
    return 0;
  }

  var preTaxProfitPerSKU = profitPerSKU - qty * costPrice;

  return shortNum(preTaxProfitPerSKU);
};

module.exports = calcPreTaxProfitPerSKU;
