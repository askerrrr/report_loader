var calcProductCosts = require("./totalProductCosts");
var calcTotalInsuranceFee = require("./totalInsuranceFee");
var calcTotalFinalProfit = require("./totalFinalProfit");
var calcTotalProfitMargin = require("./totalProfitMargin");
var calcTotalPreTaxProfit = require("./totalPreTaxProfit");

var calcRestReportTotalParams = (totals, skus) => {
  totals.totalPreTaxProfit = calcTotalPreTaxProfit(skus);

  totals.totalFinalProfit = calcTotalFinalProfit(skus);

  totals.totalProductCosts = calcProductCosts(skus);

  totals.totalInsuranceFee = calcTotalInsuranceFee(skus);

  totals.totalProfitMargin = calcTotalProfitMargin(totals.totalRetailAmount, totals.totalFinalProfit);

  return { ...totals, skus };
};

module.exports = calcRestReportTotalParams;
