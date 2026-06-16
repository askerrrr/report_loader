var updateReportsQueue = async (collection, userId, reportToUpload, queueLengthNeedsIncrement, session) => {
  var incrementValue = queueLengthNeedsIncrement ? 1 : 0;

  await collection.updateOne({ userId }, { $push: { reportsQueue: reportToUpload }, $inc: { queueLength: incrementValue } }, { session: session });
};

export default updateReportsQueue;
