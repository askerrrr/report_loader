import utils from "./utils/index.js";

var insertReportToReportTree = (dateFrom, dateTo, reportId, years) => {
  var [startYear, startMonth] = dateFrom.split("-").map(Number);
  var [endYear, endMonth] = dateTo.split("-").map(Number);

  var fullPeriod = { dateFrom, dateTo };
  var startMonthName = utils.getMonthNameAndIndex(startMonth).monthName;
  var endMonthName = utils.getMonthNameAndIndex(endMonth).monthName;

  var yearExists = utils.checkYearExists(years, startYear);

  if (!yearExists) {
    return handleYearDoesNotExist();
  }

  return handleYearExists();

  function handleYearDoesNotExist() {
    if (startYear !== endYear) {
      return handleCrossYearWhenYearDoesNotExist();
    }

    return handleSameYearWhenYearDoesNotExist();
  }

  function handleCrossYearWhenYearDoesNotExist() {
    if (utils.isNextMonthReportNeeded(dateFrom, dateTo)) {
      return insertIntoEndYearWhenStartYearMissing();
    }

    var months = utils.insertMonthDataToMonths(reportId, dateFrom);
    years.push({ year: startYear, months });

    return { years, year: startYear, month: startMonthName };
  }

  function insertIntoEndYearWhenStartYearMissing() {
    var endYearExist = utils.checkYearExists(years, endYear);

    if (endYearExist) {
      var endYearIndex = utils.getYearIndex(years, endYear);
      var { months } = years[endYearIndex];

      var { month, reportIds } = utils.getFirstMonthFromNextYear(months);
      var updatedReportIds = utils.insertReportIdAndFullPeriodToReportIds(dateTo, fullPeriod, reportId, "overlap - yes", reportIds);

      months[11] = { month, reportIds: updatedReportIds };
      years[endYearIndex] = { year: endYear, months };

      return { years, year: endYear, month: endMonthName };
    } else {
      var reportIds = utils.insertReportIdAndFullPeriodToReportIds(dateTo, fullPeriod, reportId, "overlap - yes");
      var months = utils.createNextYearMonths(reportIds);
      years.push({ year: endYear, months });

      return { years, year: endYear, month: endMonthName };
    }
  }

  function handleSameYearWhenYearDoesNotExist() {
    if (utils.isNextMonthReportNeeded(dateFrom, dateTo)) {
      var months = utils.insertMonthDataToMonths(reportId, fullPeriod, dateTo, "carry");
      years.push({ year: startYear, months });

      return { years, year: startYear, month: endMonthName };
    }

    var months = utils.insertMonthDataToMonths(reportId, fullPeriod, dateFrom);
    years.push({ year: startYear, months });

    return { years, year: startYear, month: startMonthName };
  }

  function handleYearExists() {
    if (startYear !== endYear) {
      return handleCrossYearWhenYearExists();
    }

    return handleSameYearWhenYearExists();
  }

  function handleCrossYearWhenYearExists() {
    if (utils.isNextMonthReportNeeded(dateFrom, dateTo)) {
      return insertIntoEndYearWhenStartYearExists();
    }

    var yearIndex = utils.getYearIndex(years, startYear);
    var { months } = years[yearIndex];

    years[yearIndex] = utils.updateYearStructure(months, startYear, startMonth, dateFrom, reportId, fullPeriod, "overlap - no");

    return { years, year: startYear, month: startMonthName };
  }

  function insertIntoEndYearWhenStartYearExists() {
    var nextYearExists = utils.checkYearExists(years, endYear);

    if (!nextYearExists) {
      var reportIds = utils.insertReportIdAndFullPeriodToReportIds(dateTo, fullPeriod, reportId, "overlap - yes");
      var months = utils.createNextYearMonths(reportIds);
      years.push({ year: endYear, months });

      return { years, year: endYear, month: endMonthName };
    }

    var yearIndex = utils.getYearIndex(years, endYear);
    var { months } = years[yearIndex];

    years[yearIndex] = utils.updateYearStructure(months, endYear, endMonth, dateTo, reportId, fullPeriod, "overlap - yes");

    return { years, year: endYear, month: endMonthName };
  }

  function handleSameYearWhenYearExists() {
    var yearIndex = utils.getYearIndex(years, startYear);
    var { months } = years[yearIndex];

    if (utils.isNextMonthReportNeeded(dateFrom, dateTo)) {
      years[yearIndex] = utils.updateYearStructure(months, startYear, endMonth, dateTo, reportId, fullPeriod, "overlap - yes");

      return { years, year: startYear, month: endMonthName };
    }

    years[yearIndex] = utils.updateYearStructure(months, startYear, startMonth, dateFrom, reportId, fullPeriod, "overlap - no");

    return { years, year: startYear, month: startMonthName };
  }
};

export default insertReportToReportTree;
