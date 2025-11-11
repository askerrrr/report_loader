var calcStorageCostPerItem = (skuName, storageData) => {
  var sku = storageData.find((e) => skuName === e.name);

  return sku?.skuStorageCost ?? 0;
};

module.exports = calcStorageCostPerItem;
