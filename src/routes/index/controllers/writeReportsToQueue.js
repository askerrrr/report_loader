import dbUtils from "../../../database/utils/index.js";

var writeReportsToQueue = async (req, res, next) => {
  var { userId, filteredRequiredReportPeriods } = req.body;

  await dbUtils.pushToReportsQueue(userId, filteredRequiredReportPeriods);

  var { loadingInProgress, isReportLoadingIsStopped } =
    await dbUtils.getUserReportLoadingState(userId);

  if (isReportLoadingIsStopped || loadingInProgress) {
    return;
  }

  next();
};

export default writeReportsToQueue;
