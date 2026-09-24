import { reportLoadingStateModel } from "../models/index.js";

var resetAbandonedReports = async (userId, session) => {
  var sessionOptions = session ? { session } : {};
  await reportLoadingStateModel.updateOne({ userId }, { $set: { abandonedReports: [] } }, { ...sessionOptions });
};
export default resetAbandonedReports;
