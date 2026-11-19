import getUser from "./getUser.js";
import getToken from "./getToken.js";
import createReport from "./createReport.js";
import saveNewSkusToDb from "./saveNewSkusToDb.js";
import addNewTaxYearToDb from "./addNewTaxYear.js";
import getReportsQueue from "./getReportsQueue.js";
import saveListGoodsToDb from "./saveListGoodsToDb.js";
import getListGoodsFromDb from "./getListGoodsFromDb.js";
import pushToReportsQueue from "./pushToReportsQueue.js";
import updateReportsQueue from "./updateReportsQueue.js";
import updateTaxParamsToDb from "./updateTaxParamsToDb.js";
import getBasicReportsData from "./getBasicReportsData.js";
import resetAbandonedReports from "./resetAbandonedReports.js";
import updateLastLoadedReport from "./updateLastLoadedReport.js";
import getLoadingProgressStatus from "./getLoadingProgressStatus.js";
import setLoadingProgressStatus from "./setLoadingProgressStatus.js";
import updateReportLoadingFields from "./updateReportLoadingFields.js";
import getFreshReportPeriodIndex from "./getFreshReportPeriodIndex.js";
import getUserReportLoadingState from "./getUserReportLoadingState.js";
import getUsersReportLoadingState from "./getUsersReportLoadingState.js";
import addAbandonedReportsToQueue from "./addAbandonedReportsToQueue.js";
import addReportToAbandonedReports from "./addReportToAbandonedReports.js";
import updateFreshReportPeriodIndex from "./updateFreshReportPeriodIndex.js";
import getLastReportRequestTimestamp from "./getLastReportRequestTimestamp.js";
import addReportToEmptyReportPeriods from "./addReportToEmptyReportPeriods.js";
import updateWBTokenLastUsedTimestamp from "./updateWBTokenLastUsedTimestamp.js";
import updateLastReportRequestTimestamp from "./updateLastReportRequestTimestamp.js";
import updateReportLoadingStoppedStatus from "./updateReportLoadingStoppedStatus.js";

export default {
  getUser,
  getToken,
  createReport,
  saveNewSkusToDb,
  addNewTaxYearToDb,
  getReportsQueue,
  saveListGoodsToDb,
  getListGoodsFromDb,
  pushToReportsQueue,
  updateReportsQueue,
  updateTaxParamsToDb,
  resetAbandonedReports,
  getBasicReportsData,
  getUserReportLoadingState,
  updateLastLoadedReport,
  setLoadingProgressStatus,
  getLoadingProgressStatus,
  getFreshReportPeriodIndex,
  updateReportLoadingFields,
  addAbandonedReportsToQueue,
  addReportToAbandonedReports,
  updateWBTokenLastUsedTimestamp,
  addReportToEmptyReportPeriods,
  updateFreshReportPeriodIndex,
  getUsersReportLoadingState,
  getLastReportRequestTimestamp,
  updateLastReportRequestTimestamp,
  updateReportLoadingStoppedStatus,
};
