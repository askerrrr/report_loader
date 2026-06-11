var updateReportLoadingStoppedStatus = async (collection, userId, newStatus, session) =>
  await collection.updateOne({ userId }, { $set: { isReportLoadingIsStopped: newStatus } });

export default updateReportLoadingStoppedStatus;
