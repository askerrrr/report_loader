import { reportLoadingStateModel } from "../models/index.js";

var updateLastLoadedReport = async (userId, lastLoadedReport, session) =>
  await reportLoadingStateModel.updateOne({ userId }, { $set: { lastLoadedReport } }, { session: session });

export default updateLastLoadedReport;
