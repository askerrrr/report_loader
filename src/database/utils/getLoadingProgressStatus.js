var { DatabaseError } = require("../../customError");

var getLoadingProgressStatus = async (collection, userId, session) => {
  try {
    var { loadingInProgress } = await collection.findOne({ userId }, { session });

    return { loadingInProgress };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getLoadingProgressStatus;
