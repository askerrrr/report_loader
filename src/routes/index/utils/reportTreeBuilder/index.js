var {
  getMonthsData,
  getMonthsFromYear,
  getMonthsForNewYear,
  updateYearStructure,
  getNextYearFirstMonth,
  isNextMonthReportNeeded,
  getFirstMonthReporstForNewYear,
} = require("./services/months");
var { getMonthName } = require("./services/month");
var { setReportIdInReports } = require("./services/reports");
var { getYearIndex, compareYears, checkYearExists } = require("./services/year");

var insertReportToReportTree = async (dateFrom, dateTo, reportId, years) => {
  var [startYear, startMonth] = dateFrom.split("-");
  var [endYear, endMonth] = dateTo.split("-");

  var startMonthName = await getMonthName(startMonth);
  var endMonthName = await getMonthName(endMonth);

  var fullPeriod = { dateFrom, dateTo };

  var yearIsExist = await checkYearExists(years, startYear);

  if (!yearIsExist) {
    var isSingleYearReport = await compareYears(startYear, endYear);

    if (!isSingleYearReport) {
      if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
        var endYearIsExist = await checkYearExists(years, endYear);

        if (endYearIsExist) {
          var endYearIndex = await getYearIndex(years, endYear);
          var { months } = years[endYearIndex];

          var { month, reportIds } = await getNextYearFirstMonth(months);

          reportIds = await setReportIdInReports(dateTo, reportIds, reportId, fullPeriod, "carry");

          months[11] = { month, reportIds };

          years[endYearIndex] = { year: endYear, months };

          return { years, year: endYear, month: endMonthName };
        } else {
          var reportIds = await getFirstMonthReporstForNewYear(dateTo, fullPeriod, reportId);

          var months = await getMonthsForNewYear(reportIds);

          years.push({ year: endYear, months });

          return { years, year: endYear, month: endMonthName };
        }
      }

      var months = await getMonthsData(reportId, dateFrom);
      years.push({ year: startYear, months });

      return { years, year: startYear, month: startMonthName };
    }

    if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
      var months = await getMonthsData(reportId, fullPeriod, dateTo, "carry");

      years.push({ year: startYear, months });

      return { years, year: startYear, month: endMonthName };
    }

    var months = await getMonthsData(reportId, fullPeriod, dateFrom);

    years.push({ year: startYear, months });

    return { years, year: startYear, month: startMonthName };
  }

  var isSingleYearReport = await compareYears(startYear, endYear);

  if (!isSingleYearReport) {
    if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
      var nextYearIsExist = await checkYearExists(years, endYear);

      if (!nextYearIsExist) {
        var reportIds = await getFirstMonthReporstForNewYear(dateTo, fullPeriod, reportId);

        var months = await getMonthsForNewYear(reportIds);

        years.push({ year: endYear, months });

        return { years, year: endYear, month: endMonthName };
      } else {
        var yearIndex = await getYearIndex(years, endYear);
        var months = await getMonthsFromYear(years, yearIndex);

        years[yearIndex] = await updateYearStructure(months, endYear, endMonth, dateTo, reportId, fullPeriod);

        return { years, year: endYear, month: endMonthName };
      }
    }

    var yearIndex = await getYearIndex(years, startYear);
    var months = await getMonthsFromYear(years, yearIndex);

    years[yearIndex] = await updateYearStructure(months, startYear, startMonth, dateFrom, reportId, fullPeriod);

    return { years, year: startYear, month: startMonthName };
  }

  if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
    var yearIndex = await getYearIndex(years, startYear);
    var months = await getMonthsFromYear(years, yearIndex);

    years[yearIndex] = await updateYearStructure(months, startYear, endMonth, dateTo, reportId, fullPeriod, "carry");

    return { years, year: startYear, month: endMonthName };
  }

  var yearIndex = await getYearIndex(years, startYear);
  var months = await getMonthsFromYear(years, yearIndex);

  years[yearIndex] = await updateYearStructure(months, startYear, startMonth, dateFrom, reportId, fullPeriod);

  return { years, year: startYear, month: startMonthName };
};

module.exports = insertReportToReportTree;
