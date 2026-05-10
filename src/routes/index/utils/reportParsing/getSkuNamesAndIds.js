var getSkuNamesAndIds = (report) => {
  var uniqueMap = new Map();

  for (var sku of report) {
    if (sku.vendorCode) {
      if (!uniqueMap.has(sku.nmId)) {
        uniqueMap.set(sku.nmId, { id: sku.nmId, name: sku.vendorCode });
      }
    }
  }

  return [...uniqueMap.values()];
};

export default getSkuNamesAndIds;
