/**
 * @param {"loading" | "completed"} loadingStatus
 */
var setLoadingProgressStatus = async function (userId, loadingStatus) {
  var query =
    loadingStatus === "loading"
      ? { loadingInProgress: true }
      : { loadingInProgress: false, queueCapacity: 0, lastReportRequestTimestamp: new Date().getTime() };

  var collection = this;
  await collection.updateOne({ userId }, { $set: query });
};

export default setLoadingProgressStatus;
