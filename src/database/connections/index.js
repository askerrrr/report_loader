var { connection } = require("../index");

var tokens_collection = connection.db(process.env.DB_NAME).collection("tokens");
var reports_collection = connection.db(process.env.DB_NAME).collection("reports");
var tax_params_collection = connection.db(process.env.DB_NAME).collection("tax_params");
var reports_tree_collection = connection.db(process.env.DB_NAME).collection("reports_trees");
var report_loading_states_collection = connection.db(process.env.DB_NAME).collection("report_loading_states");

module.exports = { tokens_collection, tax_params_collection, reports_collection, reports_tree_collection, report_loading_states_collection };
