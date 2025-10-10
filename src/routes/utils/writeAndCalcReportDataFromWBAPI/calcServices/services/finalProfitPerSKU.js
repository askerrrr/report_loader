var shortNum = require("../../shortNum");

var calcFinalProfitPerSKU = (preTaxProfitPerSKU, insuranceFee, taxPerSKU = 0) => {
  var finalProfitPerSKU = preTaxProfitPerSKU - insuranceFee - taxPerSKU;

  return shortNum(finalProfitPerSKU);
};

module.exports = calcFinalProfitPerSKU;
