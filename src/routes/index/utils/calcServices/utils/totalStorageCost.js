var truncateNum = require("../../reportParsing/truncateNum");

var calcTotalStorageCost = async (report) => {
  var totalStorageCost = report.reduce((acc, sku) => acc + sku.storage_fee, 0);
  return truncateNum(totalStorageCost);
};

module.exports = calcTotalStorageCost;
