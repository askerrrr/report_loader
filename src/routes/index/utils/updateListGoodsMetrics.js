var aggregateSkuMetrics = (skuMetrics, sku, postfix = "") => {
  skuMetrics.qty += sku["qty" + postfix];
  skuMetrics.tax += sku["tax" + postfix];
  skuMetrics.fines += sku["fines" + postfix];
  skuMetrics.retailAmount += sku["retailAmount" + postfix];
  skuMetrics.returnAmount += sku["returnAmount" + postfix];
  skuMetrics.storageCost += sku["storageCost" + postfix];
  skuMetrics.deliveryCost += sku["deliveryCost" + postfix];
  skuMetrics.acceptance += sku["acceptance" + postfix];
  skuMetrics.sellerPayoutAmount += sku["sellerPayoutAmount" + postfix];
  skuMetrics.deductionOrPayment += sku["deductionOrPayment" + postfix];
  skuMetrics.additionalInsuranceFee += sku["additionalInsuranceFee" + postfix];

  return skuMetrics;
};

var updateListGoodsMetrics = async (report, listGoods) => {
  var startYearPropPostfix = "InCurrentYear";
  var endYearPropPostfix = "InNextYear";

  if (report.crossesTaxYears) {
    var startYear = +report.dateFrom.split("-")[0];
    var endYear = +report.dateTo.split("-")[0];
  }

  var { year } = report.recordTo;

  for (var sku of report.skus) {
    if (report.crossesTaxYears) {
      var skuMetrics = listGoods.find((i) => i.id === sku.id).metrics;
      var indexOfStartYearMetrics = skuMetrics.findIndex((i) => i.year === startYear);
      var indexOfEndYearMetrics = skuMetrics.findIndex((i) => i.year === endYear);

      skuMetrics[indexOfStartYearMetrics] = aggregateSkuMetrics(skuMetrics[indexOfStartYearMetrics], sku, startYearPropPostfix);
      skuMetrics[indexOfStartYearMetrics] = aggregateSkuMetrics(skuMetrics[indexOfEndYearMetrics], sku, endYearPropPostfix);
    } else {
      var skuMetrics = listGoods.find((i) => i.id === sku.id).metrics;
      var indexOfCurrentYearMetrics = skuMetrics.findIndex((i) => i.year === year);
      skuMetrics[indexOfCurrentYearMetrics] = aggregateSkuMetrics(skuMetrics[indexOfCurrentYearMetrics], sku);
    }
  }

  return { listGoods };
};

module.exports = updateListGoodsMetrics;
