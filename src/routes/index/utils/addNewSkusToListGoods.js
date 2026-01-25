var defaultSkuMetricsField = {
  qty: 0,
  tax: 0,
  fines: 0,
  retailAmount: 0,
  returnAmount: 0,
  storageCost: 0,
  deliveryCost: 0,
  acceptance: 0,
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
  for (var { name, id } of skusFromFinancialReports) {
    var existSku = listGoods.find((item) => item.id === id);

    if (!existSku) {
      var newSku = { id, skuName: name, deleted: true, metrics: [] };
      listGoods.push(newSku);
    }

    if (existSku && existSku.deleted && existSku.skuName !== name) {
      listGoods.push({ ...existSku, skuName: name, deleted: false });
    }
  }

  listGoods = addMetricsToSku(listGoods, isCrossYearReport, startYear, endYear);

  return { updatedListGoods: listGoods };
};

module.exports = addNewSkusToListGoods;
