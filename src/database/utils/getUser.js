var { DatabaseError } = require("../../customError");

var getUser = async (collection, userId, session) => {
  try {
    var user = await collection.findOne({ userId }, { session: session });
    return user;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getUser;
