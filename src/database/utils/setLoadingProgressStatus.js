import { reportLoadingStateModel } from "../models/index.js";

var setLoadingProgressStatus = async (userId, loadingStatus, session) => {
  var sessionOptions = session ? { session } : {};

  if (loadingStatus === "loading") {
    await reportLoadingStateModel
      .updateOne({ userId }, { $set: { loadingInProgress: true } }, { ...sessionOptions })
      .then(() => console.log("LOADING STARTED FOR USER: " + userId));
  } else {
    await reportLoadingStateModel
      .updateOne({ userId }, { $set: { loadingInProgress: false, queueCapacity: 0, lastReportRequestTimestamp: Date.now() } }, { ...sessionOptions })
      .then(() => console.log("LOADING COMPLETED FOR USER: " + userId));
  }
};

export default setLoadingProgressStatus;
