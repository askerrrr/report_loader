var { DatabaseError } = require("../../customError");

var getFailedReportsQueue = async (collection, userId) => {
  try {
    var { failedReportsQueue } = await collection.findOne({ userId });

    return { failedReportsQueue };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getFailedReportsQueue;
