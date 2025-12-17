var calcFinalProfit = (preTaxProfit, insuranceFee, tax = 0) => preTaxProfit - insuranceFee - tax;

module.exports = calcFinalProfit;
