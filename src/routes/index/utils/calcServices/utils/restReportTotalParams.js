import sum from "./sum.js";
import calcProfitMargin from "./profitMargin.js";
import calcProductCosts from "./totalProductCosts.js";

var calcRestReportTotalParams = (totals, skus, isCrossYearReport) => {
  totals.totalPreTaxProfit = sum(skus, "preTaxProfit", "truncate-on");
  totals.totalFinalProfit = sum(skus, "finalProfit", "truncate-on");
  totals.totalProductCosts = calcProductCosts(skus);
  totals.totalInsuranceFee = sum(skus, "insuranceFee");
  totals.totalOtherExpenses = sum(skus, "otherExpenses", "truncate-on");

  if (isCrossYearReport) {
    totals.totalOtherExpensesInCurrentYear = sum(skus, "totalOtherExpensesInCurrentYear", "truncate-on");
    totals.totalOtherExpensesInNextYear = sum(skus, "totalOtherExpensesInNextYear", "truncate-on");

    totals.totalPreTaxProfitInCurrentYear = sum(skus, "preTaxProfitInCurrentYear", "truncate-on");
    totals.totalPreTaxProfitInNextYear = sum(skus, "preTaxProfitInNextYear", "truncate-on");

    totals.totalInsuranceFeeInCurrentYear = sum(skus, "insuranceFeeInCurrentYear");
    totals.totalInsuranceFeeInNextYear = sum(skus, "insuranceFeeInNextYear");

    totals.totalFinalProfitInCurrentYear = sum(skus, "finalProfitInCurrentYear", "truncate-on");
    totals.totalFinalProfitInNextYear = sum(skus, "finalProfitInNextYear", "truncate-on");

    totals.totalProfitMarginInCurrentYear = calcProfitMargin(totals.totalFinalProfitInCurrentYear, totals.totalRetailAmountInCurrentYear);

    totals.totalProfitMarginInNextYear = calcProfitMargin(totals.totalFinalProfitInNextYear, totals.totalRetailAmountInNextYear);

    totals.totalProfitMargin = (totals.totalProfitMarginInCurrentYear + totals.totalProfitMarginInNextYear) / 2;
  } else {
    totals.totalProfitMargin = calcProfitMargin(totals.totalFinalProfit, totals.totalRetailAmount);
  }

  return { ...totals, skus };
};

export default calcRestReportTotalParams;
