var getReportsQueue = async (collection, userId) => {
  var { reportsQueue } = await collection.findOne({ userId });

  return { reportsQueue: reportsQueue.toObject() };
};

module.exports = getReportsQueue;
