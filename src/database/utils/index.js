var { tokens_model, report_loading_states_model, reports_model, tax_params_model, reports_tree_model } = require("../connections");

var getToken = require("./getToken");
var getUsersData = require("./getUsersData");
var getReportsTree = require("./getReportsTree");
var saveReportToDb = require("./saveReportToDb");
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
const changePaidTaxAmountToDb = require("./changePaidTaxAmountToDb");

var db = {
  getToken: (userId) => getToken(tokens_model, userId),

  getReportsTree: (userId) => getReportsTree(reports_tree_model, userId),
  updateReportTree: (userId, years) => updateReportTree(reports_tree_model, userId, years),

  addNewTaxYearToDb: (userId, year) => addNewTaxYearToDb(tax_params_model, userId, year),
  changePaidTaxAmountToDb: (userId, year, paidTaxAmount) => changePaidTaxAmountToDb(tax_params_model, userId, year, paidTaxAmount),

  saveReportToDb: (userId, report) => saveReportToDb(reports_model, userId, report),

  getUsersData: (userId) => getUsersData(report_loading_states_model, userId),
  getReportsQueue: (userId) => getReportsQueue(report_loading_states_model, userId),
  updateFailedQueue: (userId, reportPeriod) => updateFailedQueue(report_loading_states_model, userId, reportPeriod),
  pushToReportsQueue: (userId, reportPeriod) => pushToReportsQueue(report_loading_states_model, userId, reportPeriod),
  updateReportsQueue: (userId, reportQueue) => updateReportsQueue(report_loading_states_model, userId, reportQueue),
  createReportsQueue: (userId, reportQueue) => createReportsQueue(report_loading_states_model, userId, reportQueue),
  addReportToFailedQueue: (userId, reportPeriod) => addReportToFailedQueue(report_loading_states_model, userId, reportPeriod),
  setLoadingProgressStatus: (userId, loadingStatus) => setLoadingProgressStatus(report_loading_states_model, userId, loadingStatus),
  getLoadingProgressStatus: (userId) => getLoadingProgressStatus(report_loading_states_model, userId),
};

module.exports = db;
