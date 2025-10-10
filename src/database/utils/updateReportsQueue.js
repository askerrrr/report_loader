var updateReportsQueue = async (collection, userId, updatedReportsQueue) => {
  var result = await collection.updateOne({ userId }, { $set: { reportsQueue: updatedReportsQueue } });

  return result;
};

module.exports = updateReportsQueue;
