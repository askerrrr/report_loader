var getSkuNamesAndIds = (report) => {
  var uniqueMap = new Map();

  for (var sku of report) {
    if (sku.sa_name) {
      if (!uniqueMap.has(sku.nm_id)) {
        uniqueMap.set(sku.nm_id, { id: sku.nm_id, name: sku.sa_name });
      }
    }
  }

  return [...uniqueMap.values()];
};

module.exports = getSkuNamesAndIds;
