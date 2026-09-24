import { reportLoadingStateModel } from "../models/index.js";

var getReportsQueue = async (userId, session) => {
  var data = await reportLoadingStateModel.findOneAndUpdate(
    { userId, "reportsQueue.0": { $exists: true } },
    { $pop: { reportsQueue: -1 }, $inc: { queueLength: -1 } },
    { session: session, returnDocument: "before" },
  );

  if (!data?.reportsQueue || !data?.queueLength) {
    return { report: null, queueLength: 0, lastReportRequestTimestamp: 0 };
  }

  return { report: data.reportsQueue[0], queueLength: data.queueLength, lastReportRequestTimestamp: data.lastReportRequestTimestamp };
};

export default getReportsQueue;
