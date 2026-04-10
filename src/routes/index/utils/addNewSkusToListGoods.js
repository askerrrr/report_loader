var defaultSkuMetricsField = {
  qty: 0,
  tax: 0,
  fines: 0,
  netProfit: 0,
  profitMargin: 0,
  retailAmount: 0,
  returnAmount: 0,
  storageCost: 0,
  deliveryCost: 0,
  acceptance: 0,
  otherExpenses: 0,
  sellerPayoutAmount: 0,
  deductionOrPayment: 0,
  additionalInsuranceFee: 0,
};

var addMetricsToSku = (listGoods, isCrossYearReport, startYear, endYear) => {
  for (var sku of listGoods) {
    if (isCrossYearReport) {
      if (!sku.metrics.find((i) => i.year === startYear)) {
        sku.metrics.push({ ...defaultSkuMetricsField, year: startYear });
      }

      if (!sku.metrics.find((i) => i.year === endYear)) {
        sku.metrics.push({ ...defaultSkuMetricsField, year: endYear });
      }
    } else {
      if (!sku.metrics.find((i) => i.year === startYear)) {
        sku.metrics.push({ ...defaultSkuMetricsField, year: startYear });
      }
    }
  }

  return listGoods;
};

var addNewSkusToListGoods = async (listGoods, skusFromFinancialReports, isCrossYearReport, startYear, endYear) => {
  var metrics = [];

  for (var { name, id } of skusFromFinancialReports) {
    var listGoodsFilteredBySkuId = listGoods.filter((item) => item.id === id);
    var skuIsExist = listGoodsFilteredBySkuId.find((item) => item.skuName === name);

    if (!skuIsExist) {
      var newSku = { id, skuName: name, metrics, deleted: true };
      listGoods.push(newSku);
    }
  }

  listGoods = addMetricsToSku(listGoods, isCrossYearReport, startYear, endYear);

  return { listGoodsWithNewSkus: listGoods };
};

export default addNewSkusToListGoods;
