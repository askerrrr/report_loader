var getSkuQtyByYear = (report, year) => {
  var filteredReport = report.filter((item) => {
    var saleYear = +item.sale_dt.split("T")[0].split("-")[0];
    return item.doc_type_name === "Продажа" && saleYear === year;
  });

  var qty = filteredReport.reduce((acc, i) => acc + i.quantity, 0);
  return qty;
};

module.exports = getSkuQtyByYear;
