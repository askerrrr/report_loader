var writeReportsToQueue = async (req, res, next) => {
  var db = req.app.locals.db;
  var { userId, filteredRequireddateUtils } = req.body;

  await db.pushToReportsQueue(userId, filteredRequireddateUtils);

  var { loadingInProgress } = await db.getLoadingProgressStatus(userId);

  console.log({ loadingInProgress });

  if (loadingInProgress) {
    return res.sendStatus(200);
  }

  res.sendStatus(202);

  next();
};

module.exports = writeReportsToQueue;
