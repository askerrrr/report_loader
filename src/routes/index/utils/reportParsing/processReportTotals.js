import calc from "../calcServices/index.js";
import truncateTotals from "./truncateTotals.js";

var processReportTotals = (skus, propPostfix = "") => {
  var report = {};

  report["totalFinalProfit" + propPostfix] = 0;
  report["totalInsuranceFee" + propPostfix] = 0;
  report["totalProductCosts" + propPostfix] = 0;
  report["totalPreTaxProfit" + propPostfix] = 0;
  report["totalProfitMargin" + propPostfix] = 0;
  report["totalOtherExpenses" + propPostfix] = 0;

  report["totalFines" + propPostfix] = calc.sum(skus, "fines" + propPostfix, "truncate-on");
  report["totalProfit" + propPostfix] = calc.sum(skus, "profit" + propPostfix, "truncate-on");
  report["totalTaxAmount" + propPostfix] = calc.sum(skus, "tax" + propPostfix, "truncate-on");
  report["totalDeliveryCost" + propPostfix] = calc.sum(skus, "deliveryCost" + propPostfix, "truncate-on");
  report["totalReturnAmount" + propPostfix] = calc.sum(skus, "returnAmount" + propPostfix, "truncate-on");
  report["totalRetailAmount" + propPostfix] = calc.sum(skus, "retailAmount" + propPostfix, "truncate-on");
  report["totalTaxableAmount" + propPostfix] = calc.sum(skus, "taxableAmount" + propPostfix, "truncate-on");
  report["totalPaidAcceptance" + propPostfix] = calc.sum(skus, "acceptance" + propPostfix, "truncate-on");
  report["totalAdditionalPayment" + propPostfix] = calc.sum(skus, "additionalPayment" + propPostfix, "truncate-on");
  report["totaldeductionOrPayment" + propPostfix] = calc.sum(skus, "deductionOrPayment" + propPostfix, "truncate-on");
  report["totalSellerPayoutAmount" + propPostfix] = calc.sum(skus, "sellerPayoutAmount" + propPostfix, "truncate-on");
  report["totalAdditionalInsuranceFee" + propPostfix] = calc.sum(skus, "additionalInsuranceFee" + propPostfix);

  report = truncateTotals(report);

  return report;
};

export default processReportTotals;
