import { dbClient } from "../index.js";
import { reportLoadingStateModel } from "../models/index.js";

var addAbandonedReportsToQueue = async (userId) => {
  var session = await dbClient.startSession();

  await session.withTransaction(async () => {
    var { abandonedReports } = await reportLoadingStateModel.findOne({ userId }, { abandonedReports: 1 }, { session: session });

    abandonedReports.forEach((item) => (item.failedCount = 0));

    if (abandonedReports.length) {
      var result = await reportLoadingStateModel.updateOne(
        { userId },
        {
          $set: { abandonedReports: [], loadingInProgress: true },
          $push: { reportsQueue: { $each: [...abandonedReports] } },
          $inc: { queueLength: abandonedReports.length, queueCapacity: abandonedReports.length },
        },
        { session: session },
      );

      console.log({ result });
    }
  });
};

export default addAbandonedReportsToQueue;
