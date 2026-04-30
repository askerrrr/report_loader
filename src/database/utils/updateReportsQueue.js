var updateReportsQueue = async (collection, userId, reportToUpload, session) =>
  await collection.updateOne({ userId }, { $push: { reportsQueue: reportToUpload } }, { session: session });

export default updateReportsQueue;
