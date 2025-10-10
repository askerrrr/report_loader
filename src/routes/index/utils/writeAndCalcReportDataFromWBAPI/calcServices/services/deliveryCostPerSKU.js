var calcDeliveryCostPerSKU = (sku) => {
  var deliveryCostPerSKU = sku.reduce((acc, sku) => acc + sku.delivery_rub, 0);

  return deliveryCostPerSKU;
};

module.exports = calcDeliveryCostPerSKU;
