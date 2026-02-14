var updateLastReportRequestTimestamp = async (collection, userId, session) => {
  var { lastReportRequestTimestamp } = await collection.findOne(
    { userId },
    { $set: { lastReportRequestTimestamp: new Date().getTime() } },
    { session: session },
  );
  return { lastReportRequestTimestamp };
};

module.exports = updateLastReportRequestTimestamp;
