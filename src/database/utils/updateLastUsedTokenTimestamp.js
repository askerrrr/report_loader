var mskTimeOffsetInMs = 3 * 60 * 60 * 1000;

var updateLastUsedTokenTimestamp = async (collection, userId, session) => {
  var sessionOpt = session ? { session: session } : {};
  await collection.updateOne({ userId }, { $set: { lastUsed: Date.now() + mskTimeOffsetInMs } }, { ...sessionOpt });
};

export default updateLastUsedTokenTimestamp;
