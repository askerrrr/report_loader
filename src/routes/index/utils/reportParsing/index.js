import processReportTotals from "./processReportTotals.js";
import processCrossReportSkus from "./processCrossReportSkus.js";
import processNonCrossReportSkus from "./processNonCrossReportSkus.js";

var parseReports = async (reports, taxParams, isCrossYearReport) => {
  if (isCrossYearReport) {
    var { skus, skuNamesAndIds, recalculatedTaxParams, ...firstTotals } = processCrossReportSkus(reports, taxParams);

    var currentYearPropPostfix = "InCurrentYear";
    var nextYearPropPostfix = "InNextYear";

    var currentYearTotals = processReportTotals(skus, currentYearPropPostfix);
    var nextYearTotals = processReportTotals(skus, nextYearPropPostfix);
    var generalTotals = processReportTotals(skus);

    var report = Object.assign({}, firstTotals, currentYearTotals, nextYearTotals, generalTotals);
    report.skus = skus;
    return { report, skuNamesAndIds, recalculatedTaxParams };
  } else {
    var { skus, skuNamesAndIds, recalculatedTaxParams, ...firstTotals } = processNonCrossReportSkus(reports, taxParams);
    var restTotals = processReportTotals(skus);

    var report = Object.assign({}, firstTotals, restTotals);
    report.skus = skus;
    return { report, skuNamesAndIds, recalculatedTaxParams };
  }
};

export default parseReports;
