var initSku = function (postfix) {
  var sku = {};

  if (!postfix) {
    sku.costPrice = 0;
    sku.schemaVersion = skuSchemaVersion;
  }

  sku["qty" + postfix] = 0;
  sku["tax" + postfix] = 0;
  sku["fines" + postfix] = 0;
  sku["profit" + postfix] = 0;
  sku["acceptance" + postfix] = 0;
  sku["storageCost" + postfix] = 0;
  sku["finalProfit" + postfix] = 0;
  sku["insuranceFee" + postfix] = 0;
  sku["returnAmount" + postfix] = 0;
  sku["profitMargin" + postfix] = 0;
  sku["deliveryCost" + postfix] = 0;
  sku["retailAmount" + postfix] = 0;
  sku["taxableAmount" + postfix] = 0;
  sku["averageProfit" + postfix] = 0;
  sku["otherExpenses" + postfix] = 0;
  sku["preTaxProfit" + postfix] = 0;
  sku["isCostPriceSet" + postfix] = false;
  sku["additionalPayment" + postfix] = 0;
  sku["deductionOrPayment" + postfix] = 0;
  sku["averageRetailPrice" + postfix] = 0;
  sku["sellerPayoutAmount" + postfix] = 0;
  sku["averageStorageCost" + postfix] = 0;
  sku["averageAdvertisingCost" + postfix] = 0;
  sku["additionalInsuranceFee" + postfix] = 0;
  sku["isInsuranceFeeIncluded" + postfix] = false;

  return sku;
};

export default initSku;
