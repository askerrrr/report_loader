var calcTotalSold = async (report) => report.filter((sku) => sku.doc_type_name === "Продажа").reduce((acc, sku) => acc + sku.quantity, 0);

module.exports = calcTotalSold;
