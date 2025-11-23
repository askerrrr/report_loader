var { DatabaseError } = require("../../customError");

var getUser = async (collection, userId) => {
  try {
    var user = await collection.findOne({ userId });
    return user;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getUser;
