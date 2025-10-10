var updateFailedQueue = async (collection, userId, failedReports) => {
  await collection.updateOne({ userId }, { $set: { failedReports } });
};

module.exports = updateFailedQueue;
