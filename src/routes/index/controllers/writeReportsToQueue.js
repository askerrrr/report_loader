var dbUtils = require("../../../database/utils");

var writeReportsToQueue = async (req, res, next) => {
  var { userId, filteredRequiredReportPeriods } = req.body;

  await dbUtils.pushToReportsQueue(userId, filteredRequiredReportPeriods);

  var { loadingInProgress } = await db.getLoadingProgressStatus(userId);

  if (loadingInProgress) {
    return res.sendStatus(200);
  }

  res.sendStatus(202);

  next();
};

module.exports = writeReportsToQueue;
