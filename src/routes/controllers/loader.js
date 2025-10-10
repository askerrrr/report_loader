var getReports = require("../utils/getReports");
var sortYearsTree = require("../utils/sortYearTree");
var insertReportToReportTree = require("../utils/reportTreeBuilder");
var parseReports = require("../utils/writeAndCalcReportDataFromWBAPI");

const NEXT_REPORT_DELAY_MS = 65000;

var loadingReports = async (req, res, next) => {
  var { userId } = req.body;
  var { db } = req.app.locals;
  var { token } = await db.getToken(userId);

  var { reportsQueue } = await db.getReportsQueue(userId);
  await db.setLoadingProgressStatus(userId, "loading");

  while (reportsQueue.length) {
    var { reportsQueue } = await db.getReportsQueue(userId);

    try {
      var shouldBeLoaded = reportsQueue.shift();
      var { dateFrom, dateTo } = shouldBeLoaded;

      var reports = await getReports(userId, dateFrom, dateTo, token);
      var reportId = reports.mainReport[0].realizationreport_id;

      var { years } = await db.getReportsTree(userId);
      var { years, year, month } = await insertReportToReportTree(dateFrom, dateTo, reportId, years);
      var sortedYears = await sortYearsTree(years);
      await db.updateReportTree(userId, sortedYears);

      var { taxRate, paidTaxAmount } = await db.addNewTaxYearToDb(userId, +year);

      var { report, skuNamesAndIds } = await parseReports(taxRate, reports);

      paidTaxAmount += report.totalTaxAmount;
      await db.changePaidTaxAmountToDb(userId, year, paidTaxAmount);

      report.dateTo = dateTo;
      report.userId = userId;
      report.dateFrom = dateFrom;
      report.reportId = reportId;
      report.recordTo = { year, month };
      console.log({ report });

      var success = await db.saveReportToDb(userId, report);
      console.log({ success });
      await db.updateReportsQueue(userId, reportsQueue);
    } catch (e) {
      console.log({ e });

      await db.addReportToFailedQueue(userId, shouldBeLoaded);
      await db.updateReportsQueue(userId, reportsQueue);
      continue;
    }

    await new Promise((res) => setTimeout(res, NEXT_REPORT_DELAY_MS));
  }

  await db.setLoadingProgressStatus(userId, "completed");
};

module.exports = loadingReports;
