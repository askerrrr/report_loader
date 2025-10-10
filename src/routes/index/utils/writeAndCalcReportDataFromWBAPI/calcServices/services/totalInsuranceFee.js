var calcTotalInsuranceFee = (skus) => skus.reduce((acc, sku) => acc + sku.insuranceFee, 0);

module.exports = calcTotalInsuranceFee;
