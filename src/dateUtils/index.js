/**
 * According to WBAPI's documentation, financial reports are available from January 29, 2024.
 * https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get
 **/

var getAllReportPeriods = require("./getAllReportPeriods");
var writeReportPeriodsToFile = require("./writeReportPeriodsToFile");

var runReportPeriodsWriter = () => {
  var { allPeriods } = getAllReportPeriods();

  writeReportPeriodsToFile(allPeriods);
};

module.exports = runReportPeriodsWriter;
