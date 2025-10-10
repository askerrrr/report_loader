var pushToReportsQueue = async (collection, userId, newReportPeriods) => {
  for (var period of newReportPeriods) {
    await collection.updateOne({ userId }, { $push: { reportsQueue: period } });
  }
};

module.exports = pushToReportsQueue;
