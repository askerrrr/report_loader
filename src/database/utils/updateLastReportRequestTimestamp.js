var updateLastReportRequestTimestamp = async (collection, userId, session) => {
  var { lastReportRequestTimestamp } = await collection.updateOne(
    { userId },
    { $set: { lastReportRequestTimestamp: new Date(Date.now() + 3 * 60 * 60 * 1000).getTime() } },
    { session: session },
  );
  return { lastReportRequestTimestamp };
};

export default updateLastReportRequestTimestamp;
