var { DatabaseError } = require("../../customError");

var updateReportsQueue = async (collection, userId, updatedReportsQueue, session) => {
  try {
    var result;
    if (session) {
      result = await collection.updateOne({ userId }, { $set: { reportsQueue: updatedReportsQueue } }, { session: session });
    } else {
      result = await collection.updateOne({ userId }, { $set: { reportsQueue: updatedReportsQueue } });
    }

    return result;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = updateReportsQueue;
