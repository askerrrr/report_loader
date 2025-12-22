var processReportTotals = require("./processReportTotals");
var processCrossReportSkus = require("./processCrossReportSkus");
var processNonCrossReportSkus = require("./processNonCrossReportSkus");

var parseReports = async (reports, taxParams, isCrossYearReport) => {
  if (isCrossYearReport) {
    var { skus, skuNamesAndIds, recalculatedTaxParams, ...firstTotals } = await processCrossReportSkus(reports, taxParams);

    var currentYearPropPostfix = "InCurrentYear";
    var nextYearPropPostfix = "InNextYear";

    var currentYearTotals = await processReportTotals(skus, currentYearPropPostfix);
    var nextYearTotals = await processReportTotals(skus, nextYearPropPostfix);
    var generalTotals = await processReportTotals(skus);

    var report = Object.assign({}, firstTotals, currentYearTotals, nextYearTotals, generalTotals);
    report.skus = skus;
    return { report, skuNamesAndIds, recalculatedTaxParams };
  } else {
    var { skus, skuNamesAndIds, recalculatedTaxParams, ...firstTotals } = await processNonCrossReportSkus(reports, taxParams);
    var restTotals = await processReportTotals(skus);

    var report = Object.assign({}, firstTotals, restTotals);
    report.skus = skus;
    return { report, skuNamesAndIds, recalculatedTaxParams };
  }
};

module.exports = parseReports;
