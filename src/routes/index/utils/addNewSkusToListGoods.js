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
