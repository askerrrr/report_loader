var updateReportLoadingStoppedStatus = async (collection, userId, newStatus, loadingStopReason = "", session) =>
  await collection.updateOne({ userId }, { $set: { isReportLoadingIsStopped: newStatus, loadingStopReason } });

export default updateReportLoadingStoppedStatus;
