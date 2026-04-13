import { join } from "node:path";
import { writeFileSync } from "node:fs";

var writeReportPeriodsToFile = (reportPeriods) => {
  var arrayString = JSON.stringify(reportPeriods, null, 2);
  var fileContent = `export default ${arrayString}`;
  var fileName = "reportPeriods.js";
  var filePath = join(import.meta.dirname, fileName);
  writeFileSync(filePath, fileContent);
};

export default writeReportPeriodsToFile;
