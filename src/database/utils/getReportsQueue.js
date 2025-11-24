var { DatabaseError } = require("../../customError");

var getReportsQueue = async (collection, userId, session) => {
  try {
    var { reportsQueue } = await collection.findOneAndUpdate(
      { userId },
      { $pop: { reportsQueue: -1 } },
      { session: session, returnDocument: "before" }
    );

    return { reportsQueue };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportsQueue;
