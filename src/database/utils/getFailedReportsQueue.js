var getFailedReportsQueue = async (collection, userId) => {
  var { failedReportsQueue } = await collection.findOne({ userId });

  return { failedReportsQueue };
};

module.exports = getFailedReportsQueue;
