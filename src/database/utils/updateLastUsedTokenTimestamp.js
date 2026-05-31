var updateLastUsedTokenTimestamp = async (collection, userId, session) => {
  var sessionOpt = session ? { session: session } : {};
  await collection.updateOne({ userId }, { $set: { lastUsed: new Date(Date.now() + 3 * 60 * 60 * 1000) } }, { ...sessionOpt });
};

export default updateLastUsedTokenTimestamp;
