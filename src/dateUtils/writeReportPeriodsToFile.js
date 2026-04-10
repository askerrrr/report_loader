import { join } from "node:path";
import { writeFileSync } from "node:fs";

var writeReportPeriodsToFile = (reportPeriods) => {
  var arrayString = JSON.stringify(reportPeriods, null, 2);
  var fileContent = `export default ${arrayString}`;
  var filePath = join(import.meta.dirname, "reportPeriods.js");
  writeFileSync(filePath, fileContent);
};

export default writeReportPeriodsToFile;
