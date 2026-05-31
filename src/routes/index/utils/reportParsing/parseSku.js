import initSku from "./initSku.js";
import calc from "../calcServices/index.js";

var parseSku = (name, skuQty, skuFilteredReport, storageData, taxRate, totals, postfix = "") => {
  try {
    var { totalSold, totalStorageCost, totalAdvertisingCosts } = totals;

    var sku = initSku(postfix);

    sku["qty" + postfix] = calc.quantity(skuFilteredReport);
    sku["fines" + postfix] = calc.sum(skuFilteredReport, "penalty", "truncate-on");
    sku["acceptance" + postfix] = calc.sum(skuFilteredReport, "paidAcceptance", "truncate-on");
    sku["taxableAmount" + postfix] = calc.taxableAmount(skuFilteredReport);
    sku["retailAmount" + postfix] = calc.retailAmount(skuFilteredReport);
    sku["tax" + postfix] = calc.taxAmount(sku["taxableAmount" + postfix], taxRate);
    sku["returnAmount" + postfix] = calc.returnAmount(skuFilteredReport);
    sku["deliveryCost" + postfix] = calc.sum(skuFilteredReport, "deliveryService", "truncate-on");
    sku["deductionOrPayment" + postfix] = calc.sum(skuFilteredReport, "deduction", "truncate-on");
    sku["additionalPayment" + postfix] = calc.sum(skuFilteredReport, "additionalPayment", "truncate-on");
    sku["sellerPayoutAmount" + postfix] = calc.sellerPayoutAmount(skuFilteredReport);
    sku["averageRetailPrice" + postfix] = calc.averageRetailPrice(sku["qty" + postfix], skuFilteredReport);
    sku["storageCost" + postfix] = calc.storageCost(name, storageData);
    sku["averageStorageCost" + postfix] = calc.averageStorageCost(totalStorageCost, totalSold, sku["qty" + postfix]);
    sku["averageAdvertisingCost" + postfix] = calc.averageAdvertisingCost(skuQty, totalAdvertisingCosts);
    sku["profit" + postfix] = calc.profit(sku, postfix);
    sku["averageProfit" + postfix] = calc.averageProfit(sku, postfix);

    return sku;
  } catch (e) {
    console.log({ skuError: e });
  }
};

export default parseSku;
