import { dbClient } from "../index.js";
import usersSchema from "../schemas/users.js";
import goodsSchema from "../schemas/goods.js";
import tokenSchema from "../schemas/token.js";
import reportsSchema from "../schemas/reports.js";
import taxParamsSchema from "../schemas/taxParams.js";
import reportPeriodSchema from "../schemas/reportPeriods.js";
import reportLoadingStateSchema from "../schemas/reportLoadingState.js";

var userModel = dbClient.model("User", usersSchema);
var goodsModel = dbClient.model("Goods", goodsSchema);
var tokenModel = dbClient.model("Token", tokenSchema);
var reportModel = dbClient.model("Report", reportsSchema);
var taxParamModel = dbClient.model("Tax_Param", taxParamsSchema);
var reportPeriodModel = dbClient.model("Report_Period", reportPeriodSchema);
var reportLoadingStateModel = dbClient.model("Report_Loading_State", reportLoadingStateSchema);

export { userModel, goodsModel, reportModel, tokenModel, taxParamModel, reportPeriodModel, reportLoadingStateModel };
