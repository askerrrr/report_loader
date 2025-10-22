/**
 * @param {"loading" | "completed"} loadingStatus
 */
var setLoadingProgressStatus = async function (userId, loadingStatus) {
  var collection = this;
  await collection.updateOne({ userId }, { $set: { loadingInProgress: loadingStatus === "loading" } });
};

module.exports = setLoadingProgressStatus;
