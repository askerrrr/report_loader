var writeReportsToQueue = async (req, res, next) => {
  var db = req.app.locals.db;
  var { userId, filteredRequiredReportPeriods } = req.body;

  await db.pushToReportsQueue(userId, filteredRequiredReportPeriods);

  var { loadingInProgress } = await db.getLoadingProgressStatus(userId);

  console.log({ loadingInProgress });

  if (loadingInProgress) {
    return res.sendStatus(200);
  }

  res.sendStatus(202);

  next();
};

module.exports = writeReportsToQueue;
