import dbUtils from "../../../database/utils/index.js";

var writeReportsToQueue = async (req, res, next) => {
  var { userId, filteredRequiredReportPeriods } = req.body;
  await dbUtils.pushToReportsQueue(userId, filteredRequiredReportPeriods);

  var { loadingInProgress, isReportLoadingDelayed, isReportLoadingIsStopped } = await dbUtils.getReportLoadingState(userId);

  if (isReportLoadingIsStopped) {
    return res.sendStatus(202);
  }

  if (loadingInProgress) {
    return res.sendStatus(200);
  }

  if (isReportLoadingDelayed) {
    return res.sendStatus(202);
  }

  res.sendStatus(202);

  if (req.body.needsReportLoadingDelay) {
    await dbUtils.updateReportLoadingDelayStatus(userId, true);
    await delay(req.body.nextRequestDelayMs);
    await dbUtils.updateReportLoadingDelayStatus(userId, false);
  }

  next();
};

export default writeReportsToQueue;

var delay = async function (ms) {
  return new Promise((res) => setTimeout(res, ms));
};
