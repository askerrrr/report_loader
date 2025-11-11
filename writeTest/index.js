var getDateToByDateFrom = require("../src/dateUtils");
var getReportPeriodsByRange = require("../src/dateUtils/getReportPeriodsByRange");
var { createTestLine, writeTestsToFIle } = require("./writeTestsToFIle");
var getAllReportPeriods = require("../src/dateUtils/getAllReportPeriods");

var checkFuncDateToByDateFrom = async () => {
  var dateFrom = "1900-01-01"; //It's Monday;"2025-04-14"; // "2199-12-30"; //
  var dateTo = "2200-01-05"; //It's Sunday"2025-05-04"; //

  var { fullPeriods } = await getReportPeriodsByRange(dateFrom, dateTo);
  var { allPeriods } = getAllReportPeriods();
  var tests = "";

  for (var { dateFrom, dateTo } of allPeriods) {
    var { testLine } = createTestLine(dateFrom, dateTo, getDateToByDateFrom.name);
    tests += testLine;
  }

  var funcPath = "../../src/dateUtils";

  writeTestsToFIle(tests, getDateToByDateFrom.name, funcPath);
};

checkFuncDateToByDateFrom();
