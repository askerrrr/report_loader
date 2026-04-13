import truncateNum from "../../reportParsing/truncateNum.js";

var calcSellerPayoutAmount = (report) => {
  var sellerPayoutAmount =
    report.filter((i) => i.doc_type_name === "Продажа").reduce((acc, i) => acc + i.ppvz_for_pay, 0) -
    report.filter((i) => i.doc_type_name === "Возврат").reduce((acc, i) => acc + i.ppvz_for_pay, 0);

  return truncateNum(sellerPayoutAmount);
};

export default calcSellerPayoutAmount;
