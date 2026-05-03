/**
 * @param {"loading" | "completed"} loadingStatus
 */
var setLoadingProgressStatus = async function (userId, loadingStatus) {
  var options =
    loadingStatus === "loading" ? { loadingInProgress: true } : { loadingInProgress: false, lastReportRequestTimestamp: new Date().getTime() };

  var collection = this;
  await collection.updateOne({ userId }, { $set: options });
};

export default setLoadingProgressStatus;
