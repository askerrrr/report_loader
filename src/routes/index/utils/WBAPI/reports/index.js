import { WBAPIError } from "../../../../../customError/index.js";
import createPaidStorageReportTask from "./createPaidStorageReportTask.js";
import getAdvertisingCostsReportFromWBAPI from "./getAdvertisingCostsReportFromWBAPI.js";
import getWeeklyFinancialReportFromWBAPI from "./getWeeklyFinancialReportFromWBAPI.js";
import checkPaidStorageReportCreationStatus from "./checkPaidStorageReportCreationStatus.js";
import getPaidStorageReportByTaskIdFromWBAPI from "./getPaidStorageReportByTaskIdFromWBAPI.js";

var getReports = async (userId, dateFrom, dateTo, token) => {
  var reportPeriodIsEmpty = false;
  var { taskId } = await createPaidStorageReportTask(dateFrom, dateTo, token, userId);
  var { statusIsDone } = await checkPaidStorageReportCreationStatus(taskId, token, userId);

  if (!statusIsDone) {
    throw new WBAPIError(userId, 304, "can not create paid storage report task");
  }

  var [weeklyFinancialReport, paidStorageReport, advertisingReport] = await Promise.all([
    getWeeklyFinancialReportFromWBAPI(dateFrom, dateTo, token, userId),
    getPaidStorageReportByTaskIdFromWBAPI(taskId, token, userId),
    getAdvertisingCostsReportFromWBAPI(dateFrom, dateTo, token, userId),
  ]);

  if ([weeklyFinancialReport, paidStorageReport, advertisingReport].every((i) => !i.length)) {
    reportPeriodIsEmpty = true;
  }

  var reports = { weeklyFinancialReport, paidStorageReport, advertisingReport };
  return { reports, reportPeriodIsEmpty };
};

export default getReports;
