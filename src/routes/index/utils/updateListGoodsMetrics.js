var truncateNum = require("./reportParsing/truncateNum");

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

  for (var key in skuMetrics) {
    skuMetrics[key] = truncateNum(skuMetrics[key]);
  }

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
      var skuMetrics = listGoods.find((i) => i.id === sku.id && i.skuName === sku.skuName).metrics;
      var startYearMetrics = skuMetrics.find((i) => i.year === startYear);
      var endYearMetrics = skuMetrics.find((i) => i.year === endYear);

      startYearMetrics = aggregateSkuMetrics(startYearMetrics, sku, startYearPropPostfix);
      endYearMetrics = aggregateSkuMetrics(endYearMetrics, sku, endYearPropPostfix);
    } else {
      var skuMetrics = listGoods.find((i) => i.id === sku.id && i.skuName === sku.skuName).metrics;
      var skuMetricsOfCurrentYear = skuMetrics.find((i) => i.year === year);
      skuMetricsOfCurrentYear = aggregateSkuMetrics(skuMetricsOfCurrentYear, sku);
    }
  }

  return { listGoodsWithUpdatedSkuMetrics: listGoods };
};

module.exports = updateListGoodsMetrics;
