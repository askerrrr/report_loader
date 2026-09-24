import { reportLoadingStateModel } from "../models/index.js";

var updateReportsQueue = async (userId, reportToUpload, queueLengthNeedsIncrement, session) => {
  var incrementValue = queueLengthNeedsIncrement ? 1 : 0;

  await reportLoadingStateModel.updateOne(
    { userId },
    { $push: { reportsQueue: reportToUpload }, $inc: { queueLength: incrementValue } },
    { session: session },
  );
};

export default updateReportsQueue;
