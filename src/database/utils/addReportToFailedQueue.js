var addReportToFailedQueue = async (collection, userId, report) => {
  await collection.updateOne({ userId }, { $push: { failedReports: report } });
};

module.exports = addReportToFailedQueue;
