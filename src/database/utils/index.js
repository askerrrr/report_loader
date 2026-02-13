var {
  goods_collection,
  tokens_collection,
  reports_collection,
  tax_params_collection,
  reports_tree_collection,
  report_loading_states_collection,
} = require("../connections");

var getUser = require("./getUser");
var getToken = require("./getToken");
var getUsersData = require("./getUsersData");
var getReportsTree = require("./getReportsTree");
var saveReportToDb = require("./saveReportToDb");
var addNewTaxYearToDb = require("./addNewTaxYear");
var getReportsQueue = require("./getReportsQueue");
var updateReportTree = require("./updateReportTree");
var saveListGoodsToDb = require("./saveListGoodsToDb");
var getListGoodsFromDb = require("./getListGoodsFromDb");
var pushToReportsQueue = require("./pushToReportsQueue");
var updateReportsQueue = require("./updateReportsQueue");
var changeTaxParamsToDb = require("./changeTaxParamsToDb");
var resetAbandonedReports = require("./resetAbandonedReports");
var addNewSkusToListGoods = require("./addNewSkusToListGoods");
var setLoadingProgressStatus = require("./setLoadingProgressStatus");
var getLoadingProgressStatus = require("./getLoadingProgressStatus");
var getFreshReportPeriodIndex = require("./getFreshReportPeriodIndex");
var addReportToAbandonedReports = require("./addReportToAbandonedReports");
var updateFreshReportPeriodIndex = require("./updateFreshReportPeriodIndex");
var getLastReportRequestTimestamp = require("./getLastReportRequestTimestamp");

var db = {
  getToken: (userId, session) => getToken(tokens_collection, userId, session),
  getUsersData: () => getUsersData(report_loading_states_collection),
  getUser: (userId, session) => getUser(report_loading_states_collection, userId, session),
  getReportsTree: (userId, session) => getReportsTree(reports_tree_collection, userId, session),
  getReportsQueue: (userId, session) => getReportsQueue(report_loading_states_collection, userId, session),
  getListGoodsFromDb: (userId, session) => getListGoodsFromDb(goods_collection, userId, session),
  getFreshReportPeriodIndex: (userId, session) => getFreshReportPeriodIndex(report_loading_states_collection, userId, session),
  getLoadingProgressStatus: (userId, session) => getLoadingProgressStatus(report_loading_states_collection, userId, session),
  getLastReportRequestTimestamp: (userId, session) => getLastReportRequestTimestamp(report_loading_states_collection, userId, session),

  updateReportTree: (userId, years, session) => updateReportTree(reports_tree_collection, userId, years, session),
  updateReportsQueue: (userId, report, session) => updateReportsQueue(report_loading_states_collection, userId, report, session),
  updateFreshReportPeriodIndex: (userId, nextReportPeriodIndex, session) =>
    updateFreshReportPeriodIndex(report_loading_states_collection, userId, nextReportPeriodIndex, session),

  addNewTaxYearToDb: (userId, year, session) => addNewTaxYearToDb(tax_params_collection, userId, year, session),
  addReportToAbandonedReports: (userId, reportPeriod, session) =>
    addReportToAbandonedReports(report_loading_states_collection, userId, reportPeriod, session),

  changeTaxParamsToDb: (userId, year, session, newTaxParams) => changeTaxParamsToDb(tax_params_collection, userId, year, session, newTaxParams),

  saveReportToDb: (userId, report, session) => saveReportToDb(reports_collection, userId, report, session),
  saveListGoodsToDb: (userId, listGoods, session) => saveListGoodsToDb(goods_collection, userId, listGoods, session),
  setLoadingProgressStatus: setLoadingProgressStatus.bind(report_loading_states_collection),

  addNewSkusToListGoods: (userId, newSkus, session) => addNewSkusToListGoods(goods_collection, userId, newSkus, session),
  resetAbandonedReports: (userId) => resetAbandonedReports(report_loading_states_collection, userId),
  pushToReportsQueue: (userId, reportPeriod, session) => pushToReportsQueue(report_loading_states_collection, userId, reportPeriod, session),
  createReportsQueue: (userId, reportQueue, session) => createReportsQueue(report_loading_states_collection, userId, reportQueue, session),
};

module.exports = db;
