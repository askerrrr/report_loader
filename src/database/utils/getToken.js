var { DatabaseError } = require("../../customError");

var getToken = async (collection, userId) => {
  try {
    var { token } = await collection.findOne({ userId });
    return { token };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getToken;
