var { updateYearStructure, createNextYearMonths, isNextMonthReportNeeded, insertMonthDataToMonths, getFirstMonthFromNextYear, insertReportIdAndFullPeriodToReportIds } = require("./services/months");
var { getMonthNameAndIndex } = require("./services/month");
var { getYearIndex, checkYearExists } = require("./services/year");

var insertReportToReportTree = async (dateFrom, dateTo, reportId, years) => {
  var [startYear, startMonth] = dateFrom.split("-"); //.map(Number);
  var [endYear, endMonth] = dateTo.split("-"); //.map(Number);

  var startMonthName = getMonthNameAndIndex(startMonth).monthName;
  var endMonthName = getMonthNameAndIndex(endMonth).monthName;

  var fullPeriod = { dateFrom, dateTo };

  var yearIsExist = checkYearExists(years, startYear);

  if (!yearIsExist) {
    if (startYear !== endYear) {
      if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
        var endYearIsExist = checkYearExists(years, endYear);

        if (endYearIsExist) {
          var endYearIndex = getYearIndex(years, endYear);
          var { months } = years[endYearIndex];

          var { month, reportIds } = getFirstMonthFromNextYear(months);

          reportIds = insertReportIdAndFullPeriodToReportIds(dateTo, fullPeriod, reportId, "overlap - yes", reportIds);

          months[11] = { month, reportIds };

          years[endYearIndex] = { year: endYear, months };

          return { years, year: endYear, month: endMonthName };
        } else {
          var reportIds = insertReportIdAndFullPeriodToReportIds(dateTo, fullPeriod, reportId, "overlap - no");

          var months = createNextYearMonths(reportIds);

          years.push({ year: endYear, months });

          return { years, year: endYear, month: endMonthName };
        }
      }

      var months = await insertMonthDataToMonths(reportId, dateFrom);
      years.push({ year: startYear, months });

      return { years, year: startYear, month: startMonthName };
    }

    if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
      var months = await insertMonthDataToMonths(reportId, fullPeriod, dateTo, "carry");

      years.push({ year: startYear, months });

      return { years, year: startYear, month: endMonthName };
    }

    var months = await insertMonthDataToMonths(reportId, fullPeriod, dateFrom);

    years.push({ year: startYear, months });

    return { years, year: startYear, month: startMonthName };
  }

  if (startYear !== endYear) {
    if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
      var nextYearIsExist = checkYearExists(years, endYear);

      if (!nextYearIsExist) {
        var reportIds = insertReportIdAndFullPeriodToReportIds(dateTo, fullPeriod, reportId, "overlap - no");

        var months = createNextYearMonths(reportIds);

        years.push({ year: endYear, months });

        return { years, year: endYear, month: endMonthName };
      } else {
        var yearIndex = getYearIndex(years, endYear);
        var { months } = years[yearIndex];

        years[yearIndex] = await updateYearStructure(months, endYear, endMonth, dateTo, reportId, fullPeriod, "overlap - no");

        return { years, year: endYear, month: endMonthName };
      }
    }

    var yearIndex = getYearIndex(years, startYear);
    var { months } = years[yearIndex];

    years[yearIndex] = await updateYearStructure(months, startYear, startMonth, dateFrom, reportId, fullPeriod, "overlap - no");

    return { years, year: startYear, month: startMonthName };
  }

  if (await isNextMonthReportNeeded(dateFrom, dateTo)) {
    var yearIndex = getYearIndex(years, startYear);
    var { months } = years[yearIndex];

    years[yearIndex] = await updateYearStructure(months, startYear, endMonth, dateTo, reportId, fullPeriod, "overlap - yes");

    return { years, year: startYear, month: endMonthName };
  }

  var yearIndex = getYearIndex(years, startYear);
  var { months } = years[yearIndex];

  years[yearIndex] = await updateYearStructure(months, startYear, startMonth, dateFrom, reportId, fullPeriod, "overlap - no");

  return { years, year: startYear, month: startMonthName };
};

module.exports = insertReportToReportTree;

var years = [
  {
    year: "2025",
    months: [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      {
        month: "апрель",
        reportIds: [
          null,
          null,
          {
            reportId: "337986030",
            dateFrom: "2025-04-14",
            dateTo: "2025-04-20",
          },
          null,
          null,
        ],
      },
      null,
      null,
      null,
    ],
  },
];

var dateFrom = "2025-10-06";
var dateTo = "2025-10-12";

var reportId = "new_report";

insertReportToReportTree(dateFrom, dateTo, reportId, years).then(({ year, years, month }) => console.log(...years));
