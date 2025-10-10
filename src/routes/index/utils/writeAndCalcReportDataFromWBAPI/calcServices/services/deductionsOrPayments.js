var calcDeductionsOrPayments = (report) => {
  var deductionsOrPayments = report.reduce((acc, sku) => acc + sku.deduction, 0);

  return deductionsOrPayments;
};

module.exports = calcDeductionsOrPayments;
