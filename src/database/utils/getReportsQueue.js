var { DatabaseError } = require("../../customError");

var getReportsQueue = async (collection, userId, session) => {
  try {
    var data = await collection.findOneAndUpdate(
      { userId, "reportsQueue.0": { $exists: true } },
      { $pop: { reportsQueue: -1 } },
      { session: session, returnDocument: "before" }
    );

    if (!data?.reportsQueue || !data?.reportsQueue?.length) {
      return { report: null };
    }

    return { report: data.reportsQueue[0] };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportsQueue;
