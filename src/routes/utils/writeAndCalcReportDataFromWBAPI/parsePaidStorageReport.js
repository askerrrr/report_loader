var getSKUNamesFromPaidStorageReport = require("./getSKUNamesFromPaidStorageReport");
var SKUStorageCostFromPaidStorageReport = require("./calcServices/services/SKUStorageCostFromPaidStorageReport");

var parsePaidStorageReport = async (report) => {
  var skuNames = await getSKUNamesFromPaidStorageReport(report);

  var data = [];

  for (var name of skuNames) {
    var skuStorageCost = await SKUStorageCostFromPaidStorageReport(
      report,
      name
    );

    data.push({ name, skuStorageCost });
  }

  return data;
};

module.exports = parsePaidStorageReport;
