var { join } = require("node:path");
var { writeFileSync } = require("node:fs");

var writeReportPeriodsToFile = (reportPeriods) => {
  var arrayString = JSON.stringify(reportPeriods, null, 2);
  var fileContent = `module.exports = ${arrayString}`;
  var filePath = join(__dirname, "reportPeriods.js");
  writeFileSync(filePath, fileContent);
};

module.exports = writeReportPeriodsToFile;
