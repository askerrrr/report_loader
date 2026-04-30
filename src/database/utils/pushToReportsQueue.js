var pushToReportsQueue = async (collection, userId, periods, session) => {
  for (var period of periods) {
    await collection.updateOne({ userId }, { $push: { reportsQueue: period } }, { session: session });
  }
};

export default pushToReportsQueue;
