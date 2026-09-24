import { reportLoadingStateModel } from "../models/index.js";

var pushToReportsQueue = async (userId, periods, session) => {
  await reportLoadingStateModel.updateOne(
    { userId },
    { $push: { reportsQueue: { $each: [...periods] } }, $inc: { queueLength: periods.length, queueCapacity: periods.length } },
    { session: session },
  );
};

export default pushToReportsQueue;
