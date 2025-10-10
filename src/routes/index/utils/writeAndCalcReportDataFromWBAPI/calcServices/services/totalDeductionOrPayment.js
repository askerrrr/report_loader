var calcTotalDeductionOrPayment = (skus) => skus.reduce((acc, sku) => acc + sku.deductionOrPayment, 0);

module.exports = calcTotalDeductionOrPayment;
