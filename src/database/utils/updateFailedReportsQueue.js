var updateFailedReportsQueue = async (collection, userId, failedReportsQueue) => {
  await collection.updateOne({ userId }, { $set: { failedReportsQueue } });
};

module.exports = updateFailedReportsQueue;
