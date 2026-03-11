var calc = {};

var sku = {};
var total = {};

sku.finalProfit = require("./utils/finalProfit");
sku.restParams = require("./utils/restSKUParams");
sku.profitMargin = require("./utils/profitMargin");
sku.insuranceFee = require("./utils/insuranceFee");
sku.storageCostFromPaidStorageReport = require("./utils/SKUStorageCostFromPaidStorageReport");

total.sold = require("./utils/totalSold");
total.storageCost = require("./utils/totalStorageCost");
total.profitMargin = require("./utils/totalProfitMargin");
total.restParams = require("./utils/restReportTotalParams");

calc.sku = sku;
calc.total = total;
calc.sum = require("./utils/sum");
calc.profit = require("./utils/profit");
calc.quantity = require("./utils/quantity");
calc.taxAmount = require("./utils/taxAmount");
calc.finalProfit = require("./utils/finalProfit");
calc.storageCost = require("./utils/storageCost");
calc.profitMargin = require("./utils/profitMargin");
calc.preTaxProfit = require("./utils/preTaxProfit");
calc.insuranceFee = require("./utils/insuranceFee");
calc.averageProfit = require("./utils/averageProfit");
calc.averageRetailPrice = require("./utils/averageRetailPrice");
calc.averageStorageCost = require("./utils/averageStorageCost");
calc.averageAdvertisingCost = require("./utils/averageAdvertisingCost");
calc.sellerPayoutAmount = require("./utils/sellerPayoutAmount");
calc.retailAmount = require("./utils/retailAmount");

module.exports = calc;
