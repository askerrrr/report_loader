var calcReturnAmount = (report) => report.filter((item) => item.doc_type_name === "Возврат").length;

module.exports = calcReturnAmount;
