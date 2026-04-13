var updateReportLoadingDelayStatus = async (collection, userId, isReportLoadingDelayed) =>
  await collection.updateOne({ userId }, { $set: { isReportLoadingDelayed } });

export default updateReportLoadingDelayStatus;
