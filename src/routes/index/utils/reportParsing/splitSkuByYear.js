var splitSkuByYear = (skuFilteredReport) => {
  var startYearSku = [];
  var endYearSku = [];

  var startYear = skuFilteredReport[0].date_from.split("-")[0];

  for (var sku of skuFilteredReport) {
    var saleYear = sku.sale_dt.split("-")[0];

    if (saleYear === startYear) {
      startYearSku.push(sku);
    } else {
      endYearSku.push(sku);
    }
  }

  return { startYearSku, endYearSku };
};

export default splitSkuByYear;
