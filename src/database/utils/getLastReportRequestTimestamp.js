import { reportLoadingStateModel } from "../models/index.js";

var getLastReportRequestTimestamp = async (userId, session) => {
  var { lastReportRequestTimestamp } = await reportLoadingStateModel.findOne({ userId }, { session: session });
  return { lastReportRequestTimestamp };
};

export default getLastReportRequestTimestamp;
