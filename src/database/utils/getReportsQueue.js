var { DatabaseError } = require("../../customError");

var getReportsQueue = async (collection, userId) => {
  try {
    var { reportsQueue } = await collection.findOne({ userId });

    return { reportsQueue };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportsQueue;
