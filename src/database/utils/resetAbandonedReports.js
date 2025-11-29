var resetAbandonedReports = async (collection, userId) => await collection.updateOne({ userId }, { $set: { abandonedReports: [] } });

module.exports = resetAbandonedReports;
