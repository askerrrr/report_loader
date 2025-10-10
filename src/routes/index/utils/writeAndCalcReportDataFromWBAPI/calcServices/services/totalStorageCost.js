var shortNum = require("../../shortNum");

var calcTotalStorageCost = async (report) => {
  var totalStorageCost = report.reduce((acc, sku) => acc + sku.storage_fee, 0);

  return shortNum(totalStorageCost);
};

module.exports = calcTotalStorageCost;
