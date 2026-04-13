var updateLastReportRequestTimestamp = async (collection, userId, session) => {
  var { lastReportRequestTimestamp } = await collection.updateOne(
    { userId },
    { $set: { lastReportRequestTimestamp: new Date().getTime() } },
    { session: session },
  );
  return { lastReportRequestTimestamp };
};

export default updateLastReportRequestTimestamp;
