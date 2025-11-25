var { DatabaseError } = require("../../customError");

var pushToReportsQueue = async (collection, userId, periods, session) => {
  try {
    for (var period of periods) {
      await collection.updateOne({ userId }, { $push: { reportsQueue: period } }, { session: session });
    }
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = pushToReportsQueue;
