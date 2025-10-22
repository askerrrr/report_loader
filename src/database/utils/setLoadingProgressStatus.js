/**
 * @param {object} collectin
 * @param {string} userId
 * @param {"loading" | "completed"} loadingStatus
 */
var setLoadingProgressStatus = async (userId, loadingStatus) => {
  var collection = this;
  await collection.updateOne({ userId }, { $set: { loadingInProgress: loadingStatus === "loading" } });
};

module.exports = setLoadingProgressStatus;
