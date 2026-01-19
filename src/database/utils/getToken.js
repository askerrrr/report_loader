var { DatabaseError } = require("../../customError");

var getToken = async (collection, userId, session) => {
  try {
    var token;

    if (session) {
      token = await collection.findOne({ userId }, { session: session });
    } else {
      token = await collection.findOne({ userId });
    }

    return { token };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getToken;
