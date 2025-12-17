var splitPaidStorageReportByYear = async (storageReport, startYear) => {
  if (!storageReport.length) {
    return { startYearStorageData: [], endYearStorageData: [] };
  }

  var startYearStorageData = [];
  var endYearStorageData = [];

  for (var i of storageReport) {
    var year = +i.date.split("-")[0];

    if (year === startYear) {
      startYearStorageData.push(i);
    } else {
      endYearStorageData.push(i);
    }
  }

  return { startYearStorageData, endYearStorageData };
};

module.exports = splitPaidStorageReportByYear;
