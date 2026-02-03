var calc = require("../calcServices");
var truncateTotals = require("./truncateTotals");

var processReportTotals = async (skus, propPostfix = "") => {
  var report = {};

  report["totalFines" + propPostfix] = calc.sum(skus, "fines" + propPostfix, "truncate-on");
  report["totalProfit" + propPostfix] = calc.sum(skus, "profit" + propPostfix, "truncate-on");
  report["totalTaxAmount" + propPostfix] = calc.sum(skus, "tax" + propPostfix, "truncate-on");
  report["totalDeliveryCost" + propPostfix] = calc.sum(skus, "deliveryCost" + propPostfix, "truncate-on");
  report["totalReturnAmount" + propPostfix] = calc.sum(skus, "returnAmount" + propPostfix, "truncate-on");
  report["totalRetailAmount" + propPostfix] = calc.sum(skus, "retailAmount" + propPostfix, "truncate-on");
  report["totalPaidAcceptance" + propPostfix] = calc.sum(skus, "acceptance" + propPostfix, "truncate-on");
  report["totalAdditionalPayment" + propPostfix] = calc.sum(skus, "additionalPayment" + propPostfix, "truncate-on");
  report["totalDeductionOrPayment" + propPostfix] = calc.sum(skus, "deductionOrPayment" + propPostfix, "truncate-on");
  report["totalSellerPayoutAmount" + propPostfix] = calc.sum(skus, "sellerPayoutAmount" + propPostfix, "truncate-on");
  report["totalAdditionalInsuranceFee" + propPostfix] = calc.sum(skus, "additionalInsuranceFee" + propPostfix);

  report["totalFinalProfit" + propPostfix] = 0;

  report = truncateTotals(report);

  return report;
};

module.exports = processReportTotals;
