var { DatabaseError } = require("../../customError");

var updateFailedReportsQueue = async (collection, userId, failedReportsQueue, session) => {
  try {
    var result;

    if (session) {
      result = await collection.updateOne({ userId }, { $set: { failedReportsQueue } }, { session: session });
    } else {
      result = await collection.updateOne({ userId }, { $set: { failedReportsQueue } });
    }

    return result;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = updateFailedReportsQueue;
