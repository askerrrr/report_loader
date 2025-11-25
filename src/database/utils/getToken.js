var { DatabaseError } = require("../../customError");

var getToken = async (collection, userId, session) => {
  try {
    var { token } = await collection.findOne({ userId }, { session: session });
    return { token };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getToken;
