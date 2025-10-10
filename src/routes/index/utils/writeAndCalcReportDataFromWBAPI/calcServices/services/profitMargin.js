var shortNum = require("../../shortNum");

var calcProfitMargin = ({ finalProfitPerSKU, retailAmountPerSKU }) => {
  if (finalProfitPerSKU === 0) {
    return 0;
  }

  var profitMargin = (finalProfitPerSKU * 100) / retailAmountPerSKU;

  return shortNum(profitMargin);
};

module.exports = calcProfitMargin;
