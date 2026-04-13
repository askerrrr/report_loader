import { dbClient } from "../index.js";

var goods_collection = dbClient.db(process.env.DB_NAME).collection("goods");
var tokens_collection = dbClient.db(process.env.DB_NAME).collection("tokens");
var reports_collection = dbClient.db(process.env.DB_NAME).collection("reports");
var tax_params_collection = dbClient.db(process.env.DB_NAME).collection("tax_params");
var reports_tree_collection = dbClient.db(process.env.DB_NAME).collection("reports_trees");
var report_loading_states_collection = dbClient.db(process.env.DB_NAME).collection("report_loading_states");

export { goods_collection, tokens_collection, reports_collection, tax_params_collection, reports_tree_collection, report_loading_states_collection };
