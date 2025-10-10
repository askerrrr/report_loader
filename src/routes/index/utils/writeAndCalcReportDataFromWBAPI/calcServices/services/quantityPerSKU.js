var calcQuantityPerSKU = async (report) => report.reduce((acc, i) => acc + i.quantity, 0);

module.exports = calcQuantityPerSKU;
