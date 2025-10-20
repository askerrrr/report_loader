var pushToReportsQueue = async (collection, userId, periods) => {
  for (var period of periods) {
    await collection.updateOne({ userId }, { $push: { reportsQueue: period } });
  }
};

module.exports = pushToReportsQueue;
