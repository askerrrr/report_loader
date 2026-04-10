/**
 * According to WBAPI's documentation, financial reports are available from January 29, 2024.
 * https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/paths/~1api~1v5~1supplier~1reportDetailByPeriod/get
 **/

import getAllReportPeriods from "./getAllReportPeriods.js";
import writeReportPeriodsToFile from "./writeReportPeriodsToFile.js";

var runReportPeriodsWriter = () => {
  var { allPeriods } = getAllReportPeriods();

  writeReportPeriodsToFile(allPeriods);
};

export default runReportPeriodsWriter;
