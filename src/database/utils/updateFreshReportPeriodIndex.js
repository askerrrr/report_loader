var updateFreshReportPeriodIndex = async (collection, userId, nextReportPeriodIndex, session) => {
  var result = await collection.updateOne({ userId }, { $set: { freshReportPeriodIndex: nextReportPeriodIndex } }, { session: session });
};

module.exports = updateFreshReportPeriodIndex;
