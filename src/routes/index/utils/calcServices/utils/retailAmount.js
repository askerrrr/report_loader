var truncateNum = require("../../reportParsing/truncateNum");

var calcRetailAmount = (report) => {
  var retailAmount =
    report.filter((item) => item.doc_type_name === "Продажа").reduce((acc, item) => acc + item.retail_amount, 0) -
    report.filter((item) => item.doc_type_name === "Возврат").reduce((acc, item) => acc + item.retail_amount, 0);

  return truncateNum(retailAmount);
};

module.exports = calcRetailAmount;
