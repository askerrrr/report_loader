var { DatabaseError } = require("../../customError");

var getUsersData = async (collection) => {
  try {
    var data = await collection.find({}).toArray();
    return data.map((user) => {
      return { userId: user.userId, loadingInProgress: user.loadingInProgress };
    });
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getUsersData;
