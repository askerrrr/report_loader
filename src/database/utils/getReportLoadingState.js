var getReportLoadingState = async (collection, userId, session) => {
  var sessionOptions = session ? { session: session } : {};
  var doc = await collection.findOne({ userId }, { ...sessionOptions });
  return doc;
};

module.exports = getReportLoadingState;
