import { reportLoadingStateModel } from "../models/index.js";

var setLoadingProgressStatus = async (userId, loadingStatus, session) => {
  var sessionOptions = session ? { session } : {};

  if (loadingStatus === "loading") {
    await reportLoadingStateModel.updateOne(
      { userId },
      { $set: { loadingInProgress: true } },
      { ...sessionOptions },
    );
  } else {
    await reportLoadingStateModel.updateOne(
      { userId },
      {
        $set: {
          loadingInProgress: false,
          queueCapacity: 0,
          lastReportRequestTimestamp: Date.now(),
        },
      },
      { ...sessionOptions },
    );
  }
};

export default setLoadingProgressStatus;
