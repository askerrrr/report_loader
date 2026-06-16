import loader from "../utils/loader.js";
import dbUtils from "../../../database/utils/index.js";

var loadingStopReason = "";
var statusOfReportLoadingStop = false;

var resumeReportLoading = async (req, res) => {
  var authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  var [type, secretKey] = authHeader.split(" ");

  if (type !== "Bearer" || secretKey !== process.env.SECRET_KEY) {
    return res.sendStatus(401);
  }

  var userId = req.body?.userId;

  if (!userId) {
    return res.sendStatus(400);
  }

  var user = await dbUtils.getReportLoadingState(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  if (!user.isReportLoadingIsStopped) {
    return res.sendStatus(202);
  }

  res.sendStatus(202);
  await dbUtils.updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason);

  loader(userId);
};

export default resumeReportLoading;
