import truncateNum from "../../reportParsing/truncateNum.js";

var calcPreTaxProfit = (sku, propPostfix = "") => {
  if (sku["profit" + propPostfix] === 0 || sku["qty" + propPostfix] === 0) {
    return 0;
  }

  var preTaxProfit = sku["profit" + propPostfix] - sku["otherExpenses" + propPostfix] - sku["qty" + propPostfix] * sku.costPrice;
  return truncateNum(preTaxProfit);
};

export default calcPreTaxProfit;
