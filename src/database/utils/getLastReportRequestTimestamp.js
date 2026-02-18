var getLastReportRequestTimestamp = async (collection, userId, session) => {
  var { lastReportRequestTimestamp } = await collection.findOne({ userId }, { session: session });
  return { lastReportRequestTimestamp };
};

module.exports = getLastReportRequestTimestamp;
