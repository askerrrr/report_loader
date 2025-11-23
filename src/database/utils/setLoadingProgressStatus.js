var { DatabaseError } = require("../../customError");

/**
 * @param {"loading" | "completed"} loadingStatus
 */
var setLoadingProgressStatus = async function (userId, loadingStatus) {
  try {
    var collection = this;
    await collection.updateOne({ userId }, { $set: { loadingInProgress: loadingStatus === "loading" } });
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = setLoadingProgressStatus;
