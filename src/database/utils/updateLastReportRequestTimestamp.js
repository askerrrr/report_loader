var mskTimeOffsetInMs = 3 * 60 * 60 * 1000;

var updateLastReportRequestTimestamp = async (collection, userId, session) => {
  var { lastReportRequestTimestamp } = await collection.updateOne(
    { userId },
    { $set: { lastReportRequestTimestamp: Date.now() + mskTimeOffsetInMs } },
    { session: session },
  );
  return { lastReportRequestTimestamp };
};

export default updateLastReportRequestTimestamp;
