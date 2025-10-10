var { connection } = require("../index");

var tokens_model = connection.model("Token", require("../schemas/token"));
var reports_model = connection.model("Report", require("../schemas/reports").reportsSchema);
var tax_params_model = connection.model("Tax_Param", require("../schemas/tax_params"));
var reports_tree_model = connection.model("Reports_Tree", require("../schemas/reports_tree"));
var report_loading_states_model = connection.model("Report_Loading_States", require("../schemas/report_loading_states"));

module.exports = { tokens_model, tax_params_model, reports_model, reports_tree_model, report_loading_states_model };
