var updateLastLoaderReport = async (collection, userId, lastLoadedReport) => await collection.updateOne({ userId }, { $set: { lastLoadedReport } });
export default updateLastLoaderReport;
