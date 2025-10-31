var calcDeliveryCostPerSKU = (sku) => {
  var deliveryCost = sku.reduce((acc, sku) => acc + sku.delivery_rub, 0);

  return deliveryCost;
};

module.exports = calcDeliveryCostPerSKU;
