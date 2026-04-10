var resetAbandonedReports = async (collection, userId) => await collection.updateOne({ userId }, { $set: { abandonedReports: [] } });

export default resetAbandonedReports;
