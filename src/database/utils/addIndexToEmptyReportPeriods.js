var addIndexToEmptyReportPeriods = async (collection, userId, index, session) => {
  var sessionOptions = session ? { session } : {};

  await collection.updateOne({ userId }, { $push: { emptyReportPeriodsIndexes: index } });
};

export default addIndexToEmptyReportPeriods;
