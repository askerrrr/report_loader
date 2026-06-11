var updateReportLoadingStoppedStatus = async (collection, userId, newStatus, loadingStopReason = "", session) =>
  await collection.updateOne({ userId }, { $set: { isReportLoadingIsStopped: newStatus, loadingStopReason } }, { session: session });

export default updateReportLoadingStoppedStatus;
