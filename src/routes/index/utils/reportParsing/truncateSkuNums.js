var truncateNum = require("./truncateNum");

var truncateSkuNums = (skus) =>
  skus.map((sku) => {
    for (var key in sku) {
      sku[key] = truncateNum(sku[key]);
    }

    return sku;
  });

module.exports = truncateSkuNums;
