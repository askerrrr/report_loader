import getUser from "./getUser.js";
import getToken from "./getToken.js";
import saveReportToDb from "./saveReportToDb.js";
import saveNewSkusToDb from "./saveNewSkusToDb.js";
import addNewTaxYearToDb from "./addNewTaxYear.js";
import getReportsQueue from "./getReportsQueue.js";
import getReportPeriods from "./getReportPeriods.js";
import saveListGoodsToDb from "./saveListGoodsToDb.js";
import getListGoodsFromDb from "./getListGoodsFromDb.js";
import pushToReportsQueue from "./pushToReportsQueue.js";
import updateReportsQueue from "./updateReportsQueue.js";
import updateTaxParamsToDb from "./updateTaxParamsToDb.js";
import resetAbandonedReports from "./resetAbandonedReports.js";
import getUserReportLoadingState from "./getUserReportLoadingState.js";
import updateLastLoadedReport from "./updateLastLoadedReport.js";
import addReportToReportPeriods from "./addReportToReportPeriods.js";
import getLoadingProgressStatus from "./getLoadingProgressStatus.js";
import setLoadingProgressStatus from "./setLoadingProgressStatus.js";
import updateReportLoadingFields from "./updateReportLoadingFields.js";
import getFreshReportPeriodIndex from "./getFreshReportPeriodIndex.js";
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
  saveReportToDb,
  saveNewSkusToDb,
  addNewTaxYearToDb,
  getReportsQueue,
  getReportPeriods,
  saveListGoodsToDb,
  getListGoodsFromDb,
  pushToReportsQueue,
  updateReportsQueue,
  updateTaxParamsToDb,
  resetAbandonedReports,
  getUserReportLoadingState,
  updateLastLoadedReport,
  setLoadingProgressStatus,
  addReportToReportPeriods,
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
