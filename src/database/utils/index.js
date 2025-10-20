var { tokens_collection, report_loading_states_collection, reports_collection, tax_params_collection, reports_tree_collection } = require("../connections");

var getUser = require("./getUser");
var getToken = require("./getToken");
var getUsersData = require("./getUsersData");
var getReportsTree = require("./getReportsTree");
var saveReportToDb = require("./saveReportToDb");
var getFailedReports = require("./getFailedQueue");
var addNewTaxYearToDb = require("./addNewTaxYear");
var getReportsQueue = require("./getReportsQueue");
var updateReportTree = require("./updateReportTree");
var updateFailedQueue = require("./updateFailedQueue");
var pushToReportsQueue = require("./pushToReportsQueue");
var updateReportsQueue = require("./updateReportsQueue");
var createReportsQueue = require("./createReportsQueue");
var addReportToFailedQueue = require("./addReportToFailedQueue");
var setLoadingProgressStatus = require("./setLoadingProgressStatus");
var getLoadingProgressStatus = require("./getLoadingProgressStatus");
var changePaidTaxAmountToDb = require("./changePaidTaxAmountToDb");
var addReportToAbandonedReports = require("./addReportToAbandonedReports");

var db = {
  getToken: (userId) => getToken(tokens_collection, userId),
  getUsersData: () => getUsersData(report_loading_states_collection),
  getUser: (userId) => getUser(report_loading_states_collection, userId),
  getReportsTree: (userId) => getReportsTree(reports_tree_collection, userId),
  getReportsQueue: (userId) => getReportsQueue(report_loading_states_collection, userId),
  getFailedReports: (userId) => getFailedReports(report_loading_states_collection, userId),
  getLoadingProgressStatus: (userId) => getLoadingProgressStatus(report_loading_states_collection, userId),

  updateReportTree: (userId, years) => updateReportTree(reports_tree_collection, userId, years),
  updateFailedQueue: (userId, reportQueue) => updateFailedQueue(report_loading_states_collection, userId, reportQueue),
  updateReportsQueue: (userId, reportQueue) => updateReportsQueue(report_loading_states_collection, userId, reportQueue),

  addNewTaxYearToDb: (userId, year) => addNewTaxYearToDb(tax_params_collection, userId, year),
  addReportToFailedQueue: (userId, reportPeriod) => addReportToFailedQueue(report_loading_states_collection, userId, reportPeriod),
  addReportToAbandonedReports: (userId, reportPeriod) => addReportToAbandonedReports(report_loading_states_collection, userId, reportPeriod),

  changePaidTaxAmountToDb: (userId, year, paidTaxAmount) => changePaidTaxAmountToDb(tax_params_collection, userId, year, paidTaxAmount),

  saveReportToDb: (userId, report) => saveReportToDb(reports_collection, userId, report),
  setLoadingProgressStatus: (userId, loadingStatus) => setLoadingProgressStatus(report_loading_states_collection, userId, loadingStatus),

  pushToReportsQueue: (userId, reportPeriod) => pushToReportsQueue(report_loading_states_collection, userId, reportPeriod),
  createReportsQueue: (userId, reportQueue) => createReportsQueue(report_loading_states_collection, userId, reportQueue),
};

module.exports = db;
