var { DatabaseError } = require("../../customError");

var updateReportsQueue = async (collection, userId, updatedReportsQueue, session) => {
  try {
    await collection.updateOne({ userId }, { $push: { reportsQueue: updatedReportsQueue } }, { session: session });
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = updateReportsQueue;
