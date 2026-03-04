var dbUtils = require("../../../database/utils");

var writeReportsToQueue = async (req, res, next) => {
  var { userId, filteredRequiredReportPeriods } = req.body;
  await dbUtils.pushToReportsQueue(userId, filteredRequiredReportPeriods);

  var { loadingInProgress, isReportLoadingDelayed } = await dbUtils.getReportLoadingState(userId);
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

module.exports = writeReportsToQueue;

var delay = async function (ms) {
  return new Promise((res) => setTimeout(res, ms));
};
