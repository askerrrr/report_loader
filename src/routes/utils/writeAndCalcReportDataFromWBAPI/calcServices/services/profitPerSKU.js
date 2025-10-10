var calcProfitPerSKU = (sku) =>
  sku.sellerPayoutAmountPerSKU -
  sku.finesPerSKU -
  sku.acceptancePerSKU -
  sku.storageCostPerSKU -
  sku.deliveryCostPerSKU -
  sku.additionalPaymentPerSKU -
  sku.averageAdvertisingCostPerSKU;

module.exports = calcProfitPerSKU;
