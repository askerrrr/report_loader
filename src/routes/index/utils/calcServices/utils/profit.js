var calcProfit = (sku, propPostfix = "") =>
  sku["sellerPayoutAmount" + propPostfix] -
  sku["fines" + propPostfix] -
  sku["acceptance" + propPostfix] -
  sku["storageCost" + propPostfix] -
  sku["deliveryCost" + propPostfix] -
  sku["additionalPayment" + propPostfix] -
  sku["averageAdvertisingCost" + propPostfix];

export default calcProfit;
