var updateLastLoaderReport = async (collection, userId, lastLoadedReport, session) =>
  await collection.updateOne({ userId }, { $set: { lastLoadedReport } }, { session: session });
export default updateLastLoaderReport;
