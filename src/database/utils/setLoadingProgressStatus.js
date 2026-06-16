var mskTimeOffsetInMs = 3 * 60 * 60 * 1000;

var setLoadingProgressStatus = async (collection, userId, loadingStatus, session) => {
  var sessionOptions = session ? { session } : {};

  if (loadingStatus === "loading") {
    await collection
      .updateOne({ userId }, { $set: { loadingInProgress: true } }, { ...sessionOptions })
      .then(() => console.log("LOADING STARTED FOR USER: " + userId));
  } else {
    await collection
      .updateOne(
        { userId },
        { $set: { loadingInProgress: false, queueCapacity: 0, lastReportRequestTimestamp: Date.now() + mskTimeOffsetInMs } },
        { ...sessionOptions },
      )
      .then(() => console.log("LOADING COMPLETED FOR USER: " + userId));
  }
};

export default setLoadingProgressStatus;
