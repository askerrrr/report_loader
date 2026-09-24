import { reportLoadingStateModel } from "../models/index.js";

var updateLastReportRequestTimestamp = async (userId, session) => {
  var lastReportRequestTimestamp = Date.now();

  var { lastReportRequestTimestamp } = await reportLoadingStateModel.updateOne(
    { userId },
    { $set: { lastReportRequestTimestamp } },
    { session: session },
  );
  return { lastReportRequestTimestamp };
};

export default updateLastReportRequestTimestamp;
