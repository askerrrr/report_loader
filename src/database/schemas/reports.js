var { Schema } = require("mongoose");

var booleanOptions = { type: Boolean };
var numberOptions = { type: Number, default: 0 };
var stringOptions = { type: String, required: true };

var SKUSchema = new Schema(
  {
    skuName: stringOptions,
    qty: numberOptions,
    costPrice: numberOptions,
    revenuePerSKU: numberOptions,
    sellerPayoutAmountPerSKU: numberOptions,
    finesPerSKU: numberOptions,
    returnAmountPerSKU: numberOptions,
    retailAmountPerSKU: numberOptions,
    deliveryCostPerSKU: numberOptions,
    storageCostPerSKU: numberOptions,
    acceptancePerSKU: numberOptions,
    deductionOrPayment: numberOptions,
    additionalPaymentPerSKU: numberOptions,
    taxPerSKU: numberOptions,
    insuranceFee: numberOptions,
    profitPerSKU: numberOptions,
    preTaxProfitPerSKU: numberOptions,
    finalProfitPerSKU: numberOptions,
    profitMargin: numberOptions,
    isCostPriceSet: { type: Boolean, default: false },
    isInsuranceFeeIncluded: booleanOptions,
    averageProfitPerSKU: numberOptions,
    averageRetailPrice: numberOptions,
    averageStorageCost: numberOptions,
    averageAdvertisingCostPerSKU: numberOptions,
    schemaVersion: { type: Number, required: false },
    id: { type: Number, required: true },
  },
  { _id: false }
);

var recordToSchema = new Schema({ year: stringOptions, month: stringOptions, schemaVersion: { type: Number, required: false } }, { _id: false });

var reportSchema = new Schema(
  {
    userId: stringOptions,
    reportId: numberOptions,
    dateFrom: stringOptions,
    dateTo: stringOptions,
    totalSellerPayoutAmount: numberOptions,
    totalSold: numberOptions,
    totalFines: numberOptions,
    totalProductCosts: numberOptions,
    totalReturnAmount: numberOptions,
    totalStorageCost: numberOptions,
    totalDeliveryCost: numberOptions,
    totalRetailAmount: numberOptions,
    totalPaidAcceptance: numberOptions,
    totalAdvertisingCosts: numberOptions,
    totalDeductionOrPayment: numberOptions,
    TotalAdditionalPayment: numberOptions,
    totalTaxAmount: numberOptions,
    totalInsuranceFee: numberOptions,
    totalProfit: numberOptions,
    totalPreTaxProfit: numberOptions,
    totalFinalProfit: numberOptions,
    totalProfitMargin: numberOptions,
    taxRate: { type: Number, default: 6 },
    recordTo: { type: recordToSchema, requred: true },
    skus: [{ type: SKUSchema, required: true }],
    schemaVersion: { type: Number, required: false, required: false },
  },
  { _id: false }
);

var reportsSchema = new Schema({
  userId: stringOptions,
  reports: { type: [reportSchema], required: false },
  schemaVersion: { type: Number, required: false },
});

module.exports = { SKUSchema, reportSchema, reportsSchema };
