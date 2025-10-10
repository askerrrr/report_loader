var compareYears = async (periodStartYear, periodEndYear) => periodStartYear === periodEndYear;

var checkYearExists = async (years, year) => years?.find((date) => date.year === year);

var getYearIndex = async (years, year) => years?.findIndex((date) => date.year === year);

var isNextYearReportRequired = async (dateFrom, dateTo) => {
  var yearFrom = dateFrom.split("-")[0];
  var yearTo = dateTo.split("-")[0];

  return yearFrom !== yearTo;
};

module.exports = {
  getYearIndex,
  compareYears,
  checkYearExists,
  isNextYearReportRequired,
};
