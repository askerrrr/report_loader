/**
 * @param {"loading" | "completed"} loadingStatus
 */
var setLoadingProgressStatus = async (collection, userId, loadingStatus, session) => {
  var sessionOptions = session ? { session } : {};

  var query =
    loadingStatus === "loading"
      ? { loadingInProgress: true }
      : { loadingInProgress: false, queueCapacity: 0, lastReportRequestTimestamp: new Date().getTime(), lastLoadedReport: {} };

  await collection.updateOne({ userId }, { $set: query }, { ...sessionOptions });
};

export default setLoadingProgressStatus;
