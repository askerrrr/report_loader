import {
  goods_collection,
  tokens_collection,
  reports_collection,
  tax_params_collection,
  reports_tree_collection,
  report_loading_states_collection,
} from "../connections/index.js";

import getUser from "./getUser.js";
import getToken from "./getToken.js";
import getUsersData from "./getUsersData.js";
import getReportsTree from "./getReportsTree.js";
import saveReportToDb from "./saveReportToDb.js";
import saveNewSkusToDb from "./saveNewSkusToDb.js";
import addNewTaxYearToDb from "./addNewTaxYear.js";
import getReportsQueue from "./getReportsQueue.js";
import updateReportTree from "./updateReportTree.js";
import saveListGoodsToDb from "./saveListGoodsToDb.js";
import getListGoodsFromDb from "./getListGoodsFromDb.js";
import pushToReportsQueue from "./pushToReportsQueue.js";
import updateReportsQueue from "./updateReportsQueue.js";
import changeTaxParamsToDb from "./changeTaxParamsToDb.js";
import resetAbandonedReports from "./resetAbandonedReports.js";
import getReportLoadingState from "./getReportLoadingState.js";
import setLoadingProgressStatus from "./setLoadingProgressStatus.js";
import getLoadingProgressStatus from "./getLoadingProgressStatus.js";
import getFreshReportPeriodIndex from "./getFreshReportPeriodIndex.js";
import addReportToAbandonedReports from "./addReportToAbandonedReports.js";
import updateFreshReportPeriodIndex from "./updateFreshReportPeriodIndex.js";
import getLastReportRequestTimestamp from "./getLastReportRequestTimestamp.js";
import updateReportLoadingDelayStatus from "./updateReportLoadingDelayStatus.js";
import updateLastReportRequestTimestamp from "./updateLastReportRequestTimestamp.js";
import updateReportLoadingStoppedStatus from "./updateReportLoadingStoppedStatus.js";

var db = {
  getToken: (userId, session) => getToken(tokens_collection, userId, session),
  getUsersData: () => getUsersData(report_loading_states_collection),
  getUser: (userId, session) => getUser(report_loading_states_collection, userId, session),
  getReportsTree: (userId, session) => getReportsTree(reports_tree_collection, userId, session),
  getReportsQueue: (userId, session) => getReportsQueue(report_loading_states_collection, userId, session),
  getListGoodsFromDb: (userId, session) => getListGoodsFromDb(goods_collection, userId, session),
  getReportLoadingState: (userId, session) => getReportLoadingState(report_loading_states_collection, userId, session),
  getFreshReportPeriodIndex: (userId, session) => getFreshReportPeriodIndex(report_loading_states_collection, userId, session),
  getLoadingProgressStatus: (userId, session) => getLoadingProgressStatus(report_loading_states_collection, userId, session),
  getLastReportRequestTimestamp: (userId, session) => getLastReportRequestTimestamp(report_loading_states_collection, userId, session),

  updateReportTree: (userId, years, session) => updateReportTree(reports_tree_collection, userId, years, session),

  updateReportsQueue: (userId, report, session) => updateReportsQueue(report_loading_states_collection, userId, report, session),

  updateFreshReportPeriodIndex: (userId, nextReportPeriodIndex, session) =>
    updateFreshReportPeriodIndex(report_loading_states_collection, userId, nextReportPeriodIndex, session),

  updateLastReportRequestTimestamp: (userId, session) => updateLastReportRequestTimestamp(report_loading_states_collection, userId, session),

  updateReportLoadingDelayStatus: (userId, isReportLoadingDelayed) =>
    updateReportLoadingDelayStatus(report_loading_states_collection, userId, isReportLoadingDelayed),

  updateReportLoadingStoppedStatus: (report_loading_states_collection, userId, newStatus, session) =>
    updateReportLoadingStoppedStatus(userId, newStatus, session),

  addNewTaxYearToDb: (userId, year, session) => addNewTaxYearToDb(tax_params_collection, userId, year, session),

  addReportToAbandonedReports: (userId, reportPeriod, session) =>
    addReportToAbandonedReports(report_loading_states_collection, userId, reportPeriod, session),

  changeTaxParamsToDb: (userId, session, ...updatedTaxParams) => changeTaxParamsToDb(tax_params_collection, userId, session, ...updatedTaxParams),

  saveReportToDb: (userId, report, session) => saveReportToDb(reports_collection, userId, report, session),
  saveListGoodsToDb: (userId, listGoods, session) => saveListGoodsToDb(goods_collection, userId, listGoods, session),
  setLoadingProgressStatus: setLoadingProgressStatus.bind(report_loading_states_collection),

  saveNewSkusToDb: (userId, newSkus, session) => saveNewSkusToDb(goods_collection, userId, newSkus, session),
  resetAbandonedReports: (userId) => resetAbandonedReports(report_loading_states_collection, userId),
  pushToReportsQueue: (userId, reportPeriod, session) => pushToReportsQueue(report_loading_states_collection, userId, reportPeriod, session),
  createReportsQueue: (userId, reportQueue, session) => createReportsQueue(report_loading_states_collection, userId, reportQueue, session),
};

export default db;
