var wbapi = require("./WBAPI");
var sortYearsTree = require("./sortYearTree");
var dbUtils = require("../../../database/utils");
var { connection } = require("../../../database");
var insertReportToReportTree = require("./reportTreeBuilder");
var parseReports = require("./writeAndCalcReportDataFromWBAPI");

var reportProcessing = async (userId, dateFrom, dateTo, token) => {
  var session = connection.startSession();

  try {
    session.startTransaction();

    var reports = await wbapi.getReports(userId, dateFrom, dateTo, token);
    var reportId = reports.weeklyFinancialReport[0].realizationreport_id;

    var { reportTree } = await dbUtils.getReportsTree(userId);
    var { years, year, month } = await insertReportToReportTree(dateFrom, dateTo, reportId, reportTree);
    var sortedYears = sortYearsTree(years);
    await dbUtils.updateReportTree(userId, sortedYears);

    var { taxRate, paidTaxAmount } = await dbUtils.addNewTaxYearToDb(userId, +year, session);

    var { report } = await parseReports(taxRate, reports);

    paidTaxAmount += report.totalTaxAmount;
    await dbUtils.changePaidTaxAmountToDb(userId, year, paidTaxAmount, session);

    report.dateTo = dateTo;
    report.userId = userId;
    report.taxRate = taxRate;
    report.dateFrom = dateFrom;
    report.reportId = reportId;
    report.recordTo = { year, month };

    var success = await dbUtils.saveReportToDb(userId, report, session);
    console.log({ success });

    await session.commitTransaction();
  } catch (e) {
    await session.abortTransaction();
    throw e;
  } finally {
    await session.endSession();
  }
};

module.exports = reportProcessing;
