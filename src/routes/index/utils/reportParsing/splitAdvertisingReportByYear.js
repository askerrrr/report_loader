var splitAdvertisingReportByYear = async (advertisingReport, startYear) => {
  if (!advertisingReport.length) {
    return { startYearAd: [], endYearAd: [] };
  }

  var startYearAd = [];
  var endYearAd = [];

  for (var i of advertisingReport) {
    var year = +i.updTime.split("-")[0];

    if (year === startYear) {
      startYearAd.push(i);
    } else {
      endYearAd.push(i);
    }
  }

  return { startYearAd, endYearAd };
};

module.exports = splitAdvertisingReportByYear;
