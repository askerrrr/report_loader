var shortNum = require("./shortNum");

var truncateSKUNums = (skus) =>
  Promise.all(
    skus.map((sku) => {
      for (var key of Object.keys(sku)) {
        if (typeof sku[key] == "number") {
          sku[key] = shortNum(sku[key]);
        }
      }

      return sku;
    })
  );

module.exports = truncateSKUNums;
