import { reportLoadingStateModel } from "../models/index.js";

var addReportToAbandonedReports = async (userId, reportPeriod, session) =>
  await reportLoadingStateModel.updateOne({ userId }, { $push: { abandonedReports: reportPeriod } }, { session: session });

export default addReportToAbandonedReports;
