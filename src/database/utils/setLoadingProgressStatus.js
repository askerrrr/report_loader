import { DatabaseError } from "../../customError/index.js";

/**
 * @param {"loading" | "completed"} loadingStatus
 */
var setLoadingProgressStatus = async function (userId, loadingStatus) {
  var options =
    loadingStatus === "loading" ? { loadingInProgress: true } : { loadingInProgress: false, lastReportRequestTimestamp: new Date().getTime() };

  try {
    var collection = this;
    await collection.updateOne({ userId }, { $set: options });
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default setLoadingProgressStatus;
