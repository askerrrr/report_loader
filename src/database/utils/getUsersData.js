import { DatabaseError } from "../../customError/index.js";

var getUsersData = async (collection) => {
  try {
    var data = await collection
      .find({}, { projection: { _id: 0, userId: 1, loadingInProgress: 1, reportsQueue: 1, abandonedReports: 1, isReportLoadingDelayed: 1 } })
      .toArray();
    return data;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default getUsersData;
