var { DatabaseError } = require("../../customError");

var getReportsTree = async (collection, userId, session) => {
  try {
    var { years } = await collection.findOne({ userId }, { session: session });

    return { reportTree: years };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getReportsTree;
