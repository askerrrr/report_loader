// var { DatabaseError } = require("../../../../customError");
var mandatoryInsuranceFees = [
  { year: 2023, value: 45842 },
  { year: 2024, value: 49500 },
  { year: 2025, value: 53658 },
  { year: 2026, value: 57390 },
  { year: 2027, value: 61154 },
];

var defaultTaxOptions = {
  taxRate: 6,
  paidTaxAmount: 0,
  paidInsuranceFee: 0,
  isInsuranceFeePaid: false,
  insuranceFeePercentage: 10,
};

var addNewTaxYearToDb = async (collection, userId, year) => {
  try {
    var mandatoryInsuranceFee;

    var { years } = await collection.findOne({ userId });
    var existTaxYear = years.find((date) => date.year === year);

    if (existTaxYear) {
      var nextYear = year + 1;
      var nextYearIsExist = years.find((date) => date.year === nextYear);
      mandatoryInsuranceFee = mandatoryInsuranceFees.find((item) => item.year === nextYear).value;
      var nextYearPaidTaxAmount = -mandatoryInsuranceFee;

      if (!nextYearIsExist) {
        await collection.updateOne(
          { userId },
          {
            $push: {
              years: {
                taxRate: 6,
                year: nextYear,
                paidInsuranceFee: 0,
                mandatoryInsuranceFee,
                isInsuranceFeePaid: false,
                insuranceFeePercentage: 10,
                paidTaxAmount: nextYearPaidTaxAmount,
              },
            },
          }
        );
      }

      return existTaxYear;
    }

    var previousYear = year - 1;
    var previousYearMandatoryInsuranceFee = mandatoryInsuranceFees.find((item) => item.year === previousYear).value;
    mandatoryInsuranceFee = mandatoryInsuranceFees.find((item) => item.year === year).value;
    var paidTaxAmount = -previousYearMandatoryInsuranceFee;

    await collection.updateOne(
      { userId },
      {
        $push: { years: { year, mandatoryInsuranceFee, ...defaultTaxOptions } },
      }
    );

    return { taxRate: 6, paidTaxAmount };
  } catch (e) {
    //throw new DatabaseError(userId, e);
  }
};

module.exports = addNewTaxYearToDb;
