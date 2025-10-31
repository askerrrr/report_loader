var calc = {};

var sku = {};
var total = {};

sku.tax = require("./utils/tax");
sku.fines = require("./utils/fines");
sku.profit = require("./utils/profit");
sku.profitMargin = require("./utils/profitMargin");
sku.quantity = require("./utils/quantity");
sku.returnAmount = require("./utils/returnAmount");
sku.storageCost = require("./utils/storageCost");
sku.insuranceFee = require("./utils/insuranceFee");
sku.sellerPayoutAmount = require("./utils/sellerPayoutAmount");
sku.deliveryCost = require("./utils/deliveryCost");
sku.retailAmount = require("./utils/retailAmount");
sku.deductionsOrPayments = require("./utils/deductionsOrPayments");
sku.paidAcceptance = require("./utils/paidAcceptance");
sku.finalProfit = require("./utils/finalProfit");
sku.averageProfit = require("./utils/averageProfit");
sku.additionalPayment = require("./utils/additionalPayment");
sku.averageRetailPrice = require("./utils/averageRetailPrice");
sku.averageStorageCost = require("./utils/averageStorageCost");
sku.averageAdvertisingCost = require("./utils/averageAdvertisingCost");
sku.storageCostFromPaidStorageReport = require("./utils/SKUStorageCostFromPaidStorageReport");
sku.restParams = require("./utils/restSKUParams");

total.sold = require("./utils/totalSold");
total.fines = require("./utils/totalFines");
total.profit = require("./utils/totalProfit");
total.taxAmount = require("./utils/totalTaxAmount");
total.storageCost = require("./utils/totalStorageCost");
total.deliveryCost = require("./utils/totalDeliveryCost");
total.retailAmount = require("./utils/totalRetailAmount");
total.returnAmount = require("./utils/totalReturnAmount");
total.paidAcceptance = require("./utils/totalPaidAcceptance");
total.profitMargin = require("./utils/totalProfitMargin");
total.deductionOrPayment = require("./utils/totalDeductionOrPayment");
total.sellerPayoutAmount = require("./utils/totalSellerPayoutAmount");
total.additionalPayment = require("./utils/totalAdditionalPayment");
total.restParams = require("./utils/restReportTotalParams");

calc.sku = sku;
calc.total = total;

module.exports = calc;
