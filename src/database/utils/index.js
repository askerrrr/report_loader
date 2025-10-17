var {
  tokens_collection,
  report_loading_states_collection,
  reports_collection,
  tax_params_collection,
  reports_tree_collection,
} = require("../connections");

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

  getReportsTree: (userId) => getReportsTree(reports_tree_collection, userId),
  updateReportTree: (userId, years) => updateReportTree(reports_tree_collection, userId, years),

  addNewTaxYearToDb: (userId, year) => addNewTaxYearToDb(tax_params_collection, userId, year),
  changePaidTaxAmountToDb: (userId, year, paidTaxAmount) => changePaidTaxAmountToDb(tax_params_collection, userId, year, paidTaxAmount),

  saveReportToDb: (userId, report) => saveReportToDb(reports_collection, userId, report),

  getUsersData: (userId) => getUsersData(report_loading_states_collection, userId),
  getReportsQueue: (userId) => getReportsQueue(report_loading_states_collection, userId),
  getFailedReports: (userId) => getFailedReports(report_loading_states_collection, userId),
  updateFailedQueue: (userId, reportQueue) => updateFailedQueue(report_loading_states_collection, userId, reportQueue),
  pushToReportsQueue: (userId, reportPeriod) => pushToReportsQueue(report_loading_states_collection, userId, reportPeriod),
  updateReportsQueue: (userId, reportQueue) => updateReportsQueue(report_loading_states_collection, userId, reportQueue),
  createReportsQueue: (userId, reportQueue) => createReportsQueue(report_loading_states_collection, userId, reportQueue),
  addReportToFailedQueue: (userId, reportPeriod) => addReportToFailedQueue(report_loading_states_collection, userId, reportPeriod),
  setLoadingProgressStatus: (userId, loadingStatus) => setLoadingProgressStatus(report_loading_states_collection, userId, loadingStatus),
  getLoadingProgressStatus: (userId) => getLoadingProgressStatus(report_loading_states_collection, userId),
  addReportToAbandonedReports: (userId, reportPeriod) => addReportToAbandonedReports(report_loading_states_collection, userId, reportPeriod),
};

module.exports = db;
