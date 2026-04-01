var truncateNum = require("../../reportParsing/truncateNum");

var taxableAmountOfReport = (report) => {
  var buybackReportIsExist = report.find((item) => item.report_type !== 1);

  var taxableAmountOfBuybackReport = 0;

  if (buybackReportIsExist) {
    var buybackReport = report.filter((item) => item.report_type !== 1);

    var deliveryCost = buybackReport.reduce((acc, item) => acc + item.delivery_rub, 0);

    var sellerPayoutExcludingReturns = buybackReport
      .filter((item) => item.doc_type_name === "Продажа")
      .reduce((acc, item) => acc + (item.ppvz_for_pay ?? item.retail_amount), 0);

    taxableAmountOfBuybackReport = sellerPayoutExcludingReturns - deliveryCost;
  }

  var mainReport = report.filter((item) => item.report_type === 1);

  var taxableAmountOfMainReport =
    mainReport.filter((item) => item.doc_type_name === "Продажа").reduce((acc, item) => acc + item.retail_amount, 0) -
    mainReport.filter((item) => item.doc_type_name === "Возврат").reduce((acc, item) => acc + item.retail_amount, 0);

  var taxableAmount = taxableAmountOfMainReport + taxableAmountOfBuybackReport;

  return truncateNum(taxableAmount);
};

module.exports = taxableAmountOfReport;
