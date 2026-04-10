import truncateNum from "../../reportParsing/truncateNum.js";

var calcTotalStorageCost = async (report) => {
  var totalStorageCost = report.reduce((acc, sku) => acc + sku.storage_fee, 0);
  return truncateNum(totalStorageCost);
};

export default calcTotalStorageCost;
