import { reportLoadingStateModel } from "../models/index.js";

var updateFreshReportPeriodIndex = async (userId, nextReportPeriodIndex, session) => {
  var sessionOpt = session ? { session } : {};

  var result = await reportLoadingStateModel.updateOne({ userId }, { $set: { freshReportPeriodIndex: nextReportPeriodIndex } }, { ...sessionOpt });

  return result;
};

export default updateFreshReportPeriodIndex;
