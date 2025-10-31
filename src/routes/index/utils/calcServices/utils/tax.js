var shortNum = require("../../writeAndCalcReportDataFromWBAPI/shortNum");

var calcTaxPerSKU = (retailAmount, taxRate) => {
  if (taxRate === 0) {
    return 0;
  }

  var tax = (retailAmount * taxRate) / 100;

  return shortNum(tax);
};

module.exports = calcTaxPerSKU;
