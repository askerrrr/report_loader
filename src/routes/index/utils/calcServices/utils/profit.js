var calcProfitPerSKU = (sku) =>
  sku.sellerPayoutAmount - sku.fines - sku.acceptance - sku.storageCost - sku.deliveryCost - sku.additionalPayment - sku.averageAdvertisingCost;

module.exports = calcProfitPerSKU;
