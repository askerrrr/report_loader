var addReportToEmptyReportPeriods = async (collection, userId, index, dateFrom, dateTo, session) => {
  var sessionOptions = session ? { session } : {};

  await collection.updateOne({ userId }, { $push: { emptyReportPeriods: { index, dateFrom, dateTo } } });
};

export default addReportToEmptyReportPeriods;
