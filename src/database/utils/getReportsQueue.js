import { DatabaseError } from "../../customError/index.js";

var getReportsQueue = async (collection, userId, session) => {
  try {
    var data = await collection.findOneAndUpdate(
      { userId, "reportsQueue.0": { $exists: true } },
      { $pop: { reportsQueue: -1 } },
      { session: session, returnDocument: "before" },
    );

    if (!data?.reportsQueue || !data?.reportsQueue?.length) {
      return { report: null, queueLength: 0 };
    }

    return { report: data.reportsQueue[0], queueLength: data.reportsQueue.length };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default getReportsQueue;
