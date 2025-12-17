var calcTotalStorageCost = async (report) => report.reduce((acc, sku) => acc + sku.storage_fee, 0);

module.exports = calcTotalStorageCost;
