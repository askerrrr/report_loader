import loader from "../utils/loader.js";
import dbUtils from "../../../database/utils/index.js";

var loadingStopReason = "";
var statusOfReportLoadingStop = false;

var resumeReportLoading = async (req, res) => {
  var user = await dbUtils.getReportLoadingState(userId);

  if (!user.isReportLoadingIsStopped) {
    return res.sendStatus(202);
  }

  res.sendStatus(202);
  await dbUtils.updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason);

  loader(userId);
};

export default resumeReportLoading;
