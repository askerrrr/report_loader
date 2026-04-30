var addReportToAbandonedReports = async (collection, userId, reportPeriod, session) =>
  await collection.updateOne({ userId }, { $push: { abandonedReports: reportPeriod } }, { session: session });

export default addReportToAbandonedReports;
