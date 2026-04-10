import { DatabaseError } from "../../customError/index.js";

var addReportToAbandonedReports = async (collection, userId, reportPeriod, session) => {
  try {
    await collection.updateOne({ userId }, { $push: { abandonedReports: reportPeriod } }, { session: session });
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default addReportToAbandonedReports;
