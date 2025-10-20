var addReportToFailedQueue = async (collection, userId, report) => {
  await collection.updateOne({ userId }, { $push: { failedReportsQueue: report } });
};

module.exports = addReportToFailedQueue;
