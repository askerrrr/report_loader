var { DatabaseError } = require("../../customError");

var addReportToFailedQueue = async (collection, userId, report) => {
  try {
    await collection.updateOne({ userId }, { $push: { failedReportsQueue: report } });
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = addReportToFailedQueue;
