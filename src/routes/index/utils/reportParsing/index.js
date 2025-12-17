var processReportTotals = require("./processReportTotals");
var processCrossReportSkus = require("./processCrossReportSkus");
var processNonCrossReportSkus = require("./processNonCrossReportSkus");

var parseReports = async (reports, taxParams, isCrossYearReport) => {
  var report = {};

  if (isCrossYearReport) {
    var { skus, skuNamesAndIds, ...firstTotals } = await processCrossReportSkus(reports, taxParams);

    var currentYearPropPostfix = "InCurrentYear";
    var nextYearPropPostfix = "InNextYear";

    var currentYearTotals = await processReportTotals(skus, currentYearPropPostfix);
    var nextYearTotals = await processReportTotals(skus, nextYearPropPostfix);
    var generalTotals = await processReportTotals(skus);

    report = Object.assign(report, firstTotals, currentYearTotals, nextYearTotals, generalTotals);
    report.skus = skus;
  } else {
    var { skus, skuNamesAndIds, ...firstTotals } = await processNonCrossReportSkus(reports, taxParams);
    var restTotals = await processReportTotals(skus);

    report = Object.assign(report, firstTotals, restTotals);
    report.skus = skus;
  }

  return { report, skuNamesAndIds };
};

module.exports = parseReports;
