import { reportLoadingStateModel } from "../models/index.js";

var getLoadingProgressStatus = async (userId, session) => {
  var { loadingInProgress } = await reportLoadingStateModel.findOne({ userId }, { session });

  return { loadingInProgress };
};

export default getLoadingProgressStatus;
