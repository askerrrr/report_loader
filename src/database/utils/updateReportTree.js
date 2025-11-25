var { DatabaseError } = require("../../customError");

var updateReportsTree = async (collection, userId, years, session) => {
  try {
    var result;

    if (session) {
      result = await collection.updateOne({ userId }, { $set: { years } }, { session: session });
    } else {
      result = await collection.updateOne({ userId }, { $set: { years } });
    }

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = updateReportsTree;
