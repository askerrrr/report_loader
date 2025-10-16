var utils = require("./utils");

var insertReportToReportTree = async (dateFrom, dateTo, reportId, years) => {
  var [startYear, startMonth] = dateFrom.split("-");
  var [endYear, endMonth] = dateTo.split("-");

  var startMonthName = utils.getMonthNameAndIndex(startMonth).monthName;
  var endMonthName = utils.getMonthNameAndIndex(endMonth).monthName;

  var fullPeriod = { dateFrom, dateTo };

  var yearIsExist = utils.checkYearExists(years, startYear);

  if (!yearIsExist) {
    if (startYear !== endYear) {
      if (await utils.isNextMonthReportNeeded(dateFrom, dateTo)) {
        var endYearIsExist = utils.checkYearExists(years, endYear);

        if (endYearIsExist) {
          var endYearIndex = utils.getYearIndex(years, endYear);
          var { months } = years[endYearIndex];

          var { month, reportIds } = utils.getFirstMonthFromNextYear(months);

          reportIds = utils.insertReportIdAndFullPeriodToReportIds(dateTo, fullPeriod, reportId, "overlap - yes", reportIds);

          months[11] = { month, reportIds };

          years[endYearIndex] = { year: endYear, months };

          return { years, year: endYear, month: endMonthName };
        } else {
          var reportIds = utils.insertReportIdAndFullPeriodToReportIds(dateTo, fullPeriod, reportId, "overlap - no");

          var months = utils.createNextYearMonths(reportIds);

          years.push({ year: endYear, months });

          return { years, year: endYear, month: endMonthName };
        }
      }

      var months = await utils.insertMonthDataToMonths(reportId, dateFrom);
      years.push({ year: startYear, months });

      return { years, year: startYear, month: startMonthName };
    }

    if (await utils.isNextMonthReportNeeded(dateFrom, dateTo)) {
      var months = await utils.insertMonthDataToMonths(reportId, fullPeriod, dateTo, "carry");

      years.push({ year: startYear, months });

      return { years, year: startYear, month: endMonthName };
    }

    var months = await utils.insertMonthDataToMonths(reportId, fullPeriod, dateFrom);

    years.push({ year: startYear, months });

    return { years, year: startYear, month: startMonthName };
  }

  if (startYear !== endYear) {
    if (await utils.isNextMonthReportNeeded(dateFrom, dateTo)) {
      var nextYearIsExist = utils.checkYearExists(years, endYear);

      if (!nextYearIsExist) {
        var reportIds = utils.insertReportIdAndFullPeriodToReportIds(dateTo, fullPeriod, reportId, "overlap - no");

        var months = utils.createNextYearMonths(reportIds);

        years.push({ year: endYear, months });

        return { years, year: endYear, month: endMonthName };
      } else {
        var yearIndex = utils.getYearIndex(years, endYear);
        var { months } = years[yearIndex];

        years[yearIndex] = await utils.updateYearStructure(months, endYear, endMonth, dateTo, reportId, fullPeriod, "overlap - no");

        return { years, year: endYear, month: endMonthName };
      }
    }

    var yearIndex = utils.getYearIndex(years, startYear);
    var { months } = years[yearIndex];

    years[yearIndex] = await utils.updateYearStructure(months, startYear, startMonth, dateFrom, reportId, fullPeriod, "overlap - no");

    return { years, year: startYear, month: startMonthName };
  }

  if (await utils.isNextMonthReportNeeded(dateFrom, dateTo)) {
    var yearIndex = utils.getYearIndex(years, startYear);
    var { months } = years[yearIndex];

    years[yearIndex] = await utils.updateYearStructure(months, startYear, endMonth, dateTo, reportId, fullPeriod, "overlap - yes");

    return { years, year: startYear, month: endMonthName };
  }

  var yearIndex = utils.getYearIndex(years, startYear);
  var { months } = years[yearIndex];

  years[yearIndex] = await utils.updateYearStructure(months, startYear, startMonth, dateFrom, reportId, fullPeriod, "overlap - no");

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

insertReportToReportTree(dateFrom, dateTo, "sdfsdfsf", years).then(({ years }) => console.log(...years));
