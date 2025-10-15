var getDateToByDateFrom = require("../src/periodUtils");
var getReportPeriods = require("../src/reportPeriods/getReportPeriods");
var { createTestLine, writeTestsToFIle } = require("./writeTestsToFIle");

var checkFuncDateToByDateFrom = async () => {
  var dateFrom = "1900-01-01"; //It's Monday;
  var dateTo = "2200-01-05"; //It's Sunday

  var { fullPeriods } = await getReportPeriods(dateFrom, dateTo);

  var tests = "";

  for (var { dateFrom, dateTo } of fullPeriods) {
    var { testLine } = createTestLine(dateFrom, dateTo, getDateToByDateFrom.name);
    tests += testLine;
  }

  var funcPath = "../../src/periodUtils";

  writeTestsToFIle(tests, getDateToByDateFrom.name, funcPath);
};

checkFuncDateToByDateFrom();
