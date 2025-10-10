var getSKUNamesFromPaidStorageReport = async (paidStorageReport) => {
  var data = [];

  for (var elem of paidStorageReport) {
    if (!data.includes(elem.vendorCode)) {
      data.push(elem.vendorCode);
    }
  }

  return data;
};

module.exports = getSKUNamesFromPaidStorageReport;
