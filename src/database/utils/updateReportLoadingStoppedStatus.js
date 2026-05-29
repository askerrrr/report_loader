var updateReportLoadingStoppedStatus = async (collection, userId, newStatus, session) =>
  await collection.updateOne({ userId }, { $set: { isReportLoadingisStopped: newStatus } });

export default updateReportLoadingStoppedStatus;
