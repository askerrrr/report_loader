var calc = {};

var sku = {};
var total = {};

sku.storageCostFromPaidStorageReport = require("./utils/SKUStorageCostFromPaidStorageReport");

total.sold = require("./utils/totalSold");
total.storageCost = require("./utils/totalStorageCost");

calc.sku = sku;
calc.total = total;
calc.sum = require("./utils/sum");
calc.profit = require("./utils/profit");
calc.quantity = require("./utils/quantity");
calc.taxAmount = require("./utils/taxAmount");
calc.storageCost = require("./utils/storageCost");
calc.preTaxProfit = require("./utils/preTaxProfit");
calc.averageProfit = require("./utils/averageProfit");
calc.averageRetailPrice = require("./utils/averageRetailPrice");
calc.averageStorageCost = require("./utils/averageStorageCost");
calc.averageAdvertisingCost = require("./utils/averageAdvertisingCost");

module.exports = calc;
