var sum = require("./sum");
var calcProfitMargin = require("./profitMargin");
var calcProductCosts = require("./totalProductCosts");

var calcRestReportTotalParams = (totals, skus, isCrossYearReport) => {
  totals.totalPreTaxProfit = sum(skus, "preTaxProfit", "truncate-on");
  totals.totalFinalProfit = sum(skus, "finalProfit", "truncate-on");
  totals.totalProductCosts = calcProductCosts(skus);
  totals.totalInsuranceFee = sum(skus, "insuranceFee");

  if (isCrossYearReport) {
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

module.exports = calcRestReportTotalParams;
