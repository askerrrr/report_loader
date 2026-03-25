var calcTaxableAmountOfBuybackReport = (report) => {
  var buybackReport = report.filter((item) => item.report_type !== 1);

  var deliveryCost = buybackReport.reduce((acc, item) => acc + item.delivery_rub, 0);

  var sellerPayoutExcludingReturns = buybackReport
    .filter((item) => item.doc_type_name === "Продажа")
    .reduce((acc, item) => acc + (item.ppvz_for_pay ?? item.retail_amount), 0);

  var taxableAmount = sellerPayoutExcludingReturns - deliveryCost;

  return taxableAmount;
};

module.exports = calcTaxableAmountOfBuybackReport;
