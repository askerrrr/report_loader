var mongoose = require("mongoose");

var report_loading_states_schema = new mongoose.Schema({
  userId: { type: String, required: true },
  requiredReportPeriods: { type: Array, required: false },
  loadedReports: { type: Array, required: false },
  remainingReports: { type: Array, required: false },
  failedReports: { type: Array, required: false },
  reportsQueue: { type: Array, required: false },
  loadingInProgress: { type: Boolean, default: false },
});

module.exports = report_loading_states_schema;

//  user: "admin",
//   pass: "passwd",
//   authSource: "admin",
//   authMechanism: "SCRAM-SHA-1",
