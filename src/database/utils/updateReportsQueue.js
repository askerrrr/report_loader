var { DatabaseError } = require("../../customError");

var updateReportsQueue = async (collection, userId, reportToUpload, session) => {
  try {
    await collection.updateOne({ userId }, { $push: { reportsQueue: reportToUpload } }, { session: session });
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = updateReportsQueue;
