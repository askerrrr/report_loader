var { tokens_collection, report_loading_states_collection, reports_collection, tax_params_collection, reports_tree_collection } = require("../connections");

var getUser = require("./getUser");
var getToken = require("./getToken");
var getUsersData = require("./getUsersData");
var getReportsTree = require("./getReportsTree");
var saveReportToDb = require("./saveReportToDb");
var getFailedReportsQueue = require("./getFailedReportsQueue");
var addNewTaxYearToDb = require("./addNewTaxYear");
var getReportsQueue = require("./getReportsQueue");
var updateReportTree = require("./updateReportTree");
var updateFailedReportsQueue = require("./updateFailedReportsQueue");
var pushToReportsQueue = require("./pushToReportsQueue");
var updateReportsQueue = require("./updateReportsQueue");
var createReportsQueue = require("./createReportsQueue");
var addReportToFailedQueue = require("./addReportToFailedQueue");
var setLoadingProgressStatus = require("./setLoadingProgressStatus");
var getLoadingProgressStatus = require("./getLoadingProgressStatus");
var changePaidTaxAmountToDb = require("./changePaidTaxAmountToDb");
var getFreshReportPeriodIndex = require('./getFreshReportPeriodIndex')
var addReportToAbandonedReports = require("./addReportToAbandonedReports");
var updateFreshReportPeriodIndex = require('./updateFreshReportPeriodIndex')

var db = {
  getToken: (userId, session) => getToken(tokens_collection, userId, session),
  getUsersData: () => getUsersData(report_loading_states_collection),
  getUser: (userId, session) => getUser(report_loading_states_collection, userId, session),
  getReportsTree: (userId, session) => getReportsTree(reports_tree_collection, userId, session),
  getReportsQueue: (userId, session) => getReportsQueue(report_loading_states_collection, userId, session),
  getFailedReportsQueue: (userId) => getFailedReportsQueue(report_loading_states_collection, userId),
  getFreshReportPeriodIndex: (userId, session) => getFreshReportPeriodIndex(report_loading_states_collection, userId, session),
  getLoadingProgressStatus: (userId, session) => getLoadingProgressStatus(report_loading_states_collection, userId, session),

  updateReportTree: (userId, years, session) => updateReportTree(reports_tree_collection, userId, years, session),
  updateFailedReportsQueue: (userId, reportQueue) => updateFailedReportsQueue(report_loading_states_collection, userId, reportQueue),
  updateReportsQueue: (userId, report, session) => updateReportsQueue(report_loading_states_collection, userId, report, session),
  updateFreshReportPeriodIndex: (userId, nextReportPeriodIndex, session) => updateFreshReportPeriodIndex(report_loading_states_collection, userId, nextReportPeriodIndex, session),

  addNewTaxYearToDb: (userId, year, session) => addNewTaxYearToDb(tax_params_collection, userId, year, session),
  addReportToFailedQueue: (userId, reportPeriod) => addReportToFailedQueue(report_loading_states_collection, userId, reportPeriod),
  addReportToAbandonedReports: (userId, reportPeriod, session) => addReportToAbandonedReports(report_loading_states_collection, userId, reportPeriod, session),

  changePaidTaxAmountToDb: (userId, year, paidTaxAmount, session) => changePaidTaxAmountToDb(tax_params_collection, userId, year, paidTaxAmount, session),

  saveReportToDb: (userId, report, session) => saveReportToDb(reports_collection, userId, report, session),
  setLoadingProgressStatus: setLoadingProgressStatus.bind(report_loading_states_collection),

  pushToReportsQueue: (userId, reportPeriod, session) => pushToReportsQueue(report_loading_states_collection, userId, reportPeriod, session),
  createReportsQueue: (userId, reportQueue, session) => createReportsQueue(report_loading_states_collection, userId, reportQueue, session),
};

module.exports = db;
