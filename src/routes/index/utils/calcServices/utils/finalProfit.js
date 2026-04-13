import truncateNum from "../../reportParsing/truncateNum.js";

var calcFinalProfit = (sku, propPostfix = "") => {
  var finalProfit =
    sku["preTaxProfit" + propPostfix] - sku["tax" + propPostfix] - sku["insuranceFee" + propPostfix] - sku["additionalInsuranceFee" + propPostfix];

  return truncateNum(finalProfit);
};

export default calcFinalProfit;
