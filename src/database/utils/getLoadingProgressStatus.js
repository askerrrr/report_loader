var { DatabaseError } = require("../../customError");

var getLoadingProgressStatus = async (collection, userId) => {
  try {
    var { loadingInProgress } = await collection.findOne({ userId });

    return { loadingInProgress };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getLoadingProgressStatus;
