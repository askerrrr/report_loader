/**
 * @param {object} collectin
 * @param {string} userId
 * @param {"loading" | "completed"} loadingStatus
 */
var setLoadingProgressStatus = async (collection, userId, loadingStatus) => {
  console.log({ loadingStatus });
  await collection.updateOne({ userId }, { $set: { loadingInProgress: loadingStatus === "loading" } });
};

module.exports = setLoadingProgressStatus;
