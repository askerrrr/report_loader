var updateSkuInArray = async (skus, { skuIndex, costPrice, fieldName }) => {
  var sku = skus[skuIndex];

  sku[fieldName] = costPrice;

  skus[skuIndex] = sku;

  return skus;
};

module.exports = updateSkuInArray;
