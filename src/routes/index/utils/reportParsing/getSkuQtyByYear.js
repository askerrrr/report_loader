var getSkuQtyByYear = (report, year) => {
  var filteredReport = report.filter((item) => {
    var saleYear = +item.saleDt.split("T")[0].split("-")[0];
    return item.docTypeName === "Продажа" && saleYear === year;
  });

  var qty = filteredReport.reduce((acc, i) => acc + i.quantity, 0);
  return qty;
};

export default getSkuQtyByYear;
