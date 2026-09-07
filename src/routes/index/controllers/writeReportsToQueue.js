import dbUtils from "../../../database/utils/index.js";

var writeReportsToQueue = async (req, res, next) => {
  var { userId, filteredRequiredReportPeriods } = req.body;
  await dbUtils.pushToReportsQueue(userId, filteredRequiredReportPeriods);

  var { loadingInProgress, isReportLoadingIsStopped } =
    await dbUtils.getUserReportLoadingState(userId);

  if (isReportLoadingIsStopped) {
    return res.sendStatus(202);
  }

  if (loadingInProgress) {
    return res.sendStatus(200);
  }

  res.sendStatus(202);

  next();
};

export default writeReportsToQueue;
