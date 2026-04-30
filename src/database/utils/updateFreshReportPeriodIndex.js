var updateFreshReportPeriodIndex = async (collection, userId, nextReportPeriodIndex, session) => {
  var sessionOpt = session ? { session } : {};

  var result = await collection.updateOne({ userId }, { $set: { freshReportPeriodIndex: nextReportPeriodIndex } }, { ...sessionOpt });

  return result;
};

export default updateFreshReportPeriodIndex;
