var truncateNum = require("../../reportParsing/truncateNum");

var calcStorageCost = (skuName, storageData) => {
  var sku = storageData.find((e) => skuName === e.name);

  return truncateNum(sku?.skuStorageCost ?? 0);
};

module.exports = calcStorageCost;
