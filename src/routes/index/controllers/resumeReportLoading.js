import loader from "../utils/loader.js";
import dbUtils from "../../../database/utils/index.js";

var loadingStopReason = "";
var statusOfReportLoadingStop = false;

var resumeReportLoading = async (req, res) => {
  var { userId } = req.body;

  var user = await dbUtils.getUserReportLoadingState(userId);

  res.sendStatus(202);

  if (!user.isReportLoadingIsStopped) {
    return;
  }

  await dbUtils.updateReportLoadingStoppedStatus(
    userId,
    statusOfReportLoadingStop,
    loadingStopReason,
  );

  await loader(userId);
};

export default resumeReportLoading;
