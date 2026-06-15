/**
 * @param {"loading" | "completed"} loadingStatus
 */

var mskTimeOffsetInMs = 3 * 60 * 60 * 1000;

var setLoadingProgressStatus = async (collection, userId, loadingStatus, session) => {
  var sessionOptions = session ? { session } : {};

  var query =
    loadingStatus === "loading"
      ? { loadingInProgress: true }
      : { loadingInProgress: false, queueCapacity: 0, lastReportRequestTimestamp: Date.now() + mskTimeOffsetInMs, lastLoadedReport: {} };

  await collection.updateOne({ userId }, { $set: query }, { ...sessionOptions });
};

export default setLoadingProgressStatus;
