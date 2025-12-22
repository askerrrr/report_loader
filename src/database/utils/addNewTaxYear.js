var { DatabaseError } = require("../../../../customError");

var defaultTaxParams = [
  {
    year: 2023,
    taxRate: 6,
    mandatoryInsuranceFee: 45842,
    paidTaxAmount: -45842,
    maxInsuranceFee: 0,
    retailAmount: 0,
    finalProfit: 0,
    additionalInsuranceFee: 0,
    requiresAdditionalInsuranceFee: false,
    mandatoryInsuranceFeeRate: 10,
    hasExcessIncomeForInsurance: false,
    mandatoryInsuranceFeeIsPaid: false,
    additionalInsuranceFeeIsPaid: false,
    excessInsuranceRate: 1,
  },
  {
    year: 2024,
    taxRate: 6,
    mandatoryInsuranceFee: 49500,
    paidTaxAmount: -49500,
    maxInsuranceFee: 277571,
    retailAmount: 0,
    finalProfit: 0,
    additionalInsuranceFee: 0,
    requiresAdditionalInsuranceFee: false,
    mandatoryInsuranceFeeRate: 10,
    hasExcessIncomeForInsurance: false,
    mandatoryInsuranceFeeIsPaid: false,
    additionalInsuranceFeeIsPaid: false,
    excessInsuranceRate: 1,
  },
  {
    year: 2025,
    taxRate: 6,
    mandatoryInsuranceFee: 53658,
    paidTaxAmount: -53658,
    maxInsuranceFee: 300888,
    retailAmount: 0,
    finalProfit: 0,
    additionalInsuranceFee: 0,
    requiresAdditionalInsuranceFee: false,
    mandatoryInsuranceFeeRate: 10,
    hasExcessIncomeForInsurance: false,
    mandatoryInsuranceFeeIsPaid: false,
    additionalInsuranceFeeIsPaid: false,
    excessInsuranceRate: 1,
  },
  {
    year: 2026,
    taxRate: 6,
    mandatoryInsuranceFee: 57390,
    paidTaxAmount: -57390,
    maxInsuranceFee: 0,
    retailAmount: 0,
    finalProfit: 0,
    additionalInsuranceFee: 0,
    requiresAdditionalInsuranceFee: false,
    mandatoryInsuranceFeeRate: 10,
    hasExcessIncomeForInsurance: false,
    mandatoryInsuranceFeeIsPaid: false,
    additionalInsuranceFeeIsPaid: false,
    excessInsuranceRate: 1,
  },
  {
    year: 2027,
    taxRate: 6,
    mandatoryInsuranceFee: 61154,
    paidTaxAmount: -61154,
    maxInsuranceFee: 0,
    retailAmount: 0,
    finalProfit: 0,
    additionalInsuranceFee: 0,
    requiresAdditionalInsuranceFee: false,
    mandatoryInsuranceFeeRate: 10,
    hasExcessIncomeForInsurance: false,
    mandatoryInsuranceFeeIsPaid: false,
    additionalInsuranceFeeIsPaid: false,
    excessInsuranceRate: 1,
  },
];

var addNewTaxYearToDb = async (collection, userId, year, session) => {
  try {
    var data = await collection.findOne({ userId }, null, { session: session });
    var taxYears = data.toObject().years;

    var existTaxParams = taxYears.find((params) => params.year === year);
    if (existTaxParams) {
      var nextYear = year + 1;
      var nextYearTaxParams = taxYears.find((params) => params.year === nextYear);
      if (!nextYearTaxParams) {
        var defaultNextYearTaxParams = defaultTaxParams.find((i) => i.year === nextYear);
        await collection.updateOne(
          { userId },
          { $push: { years: { ...defaultNextYearTaxParams } } },
          { session: session }
        );
      }

      return existTaxParams;
    }

    var defaultCurrentYearTaxParams = defaultTaxParams.find((i) => i.year === year);

    await collection.updateOne(
      { userId },
      { $push: { years: { ...defaultCurrentYearTaxParams } } },
      { session: session }
    );

    return defaultCurrentYearTaxParams;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = addNewTaxYearToDb;
