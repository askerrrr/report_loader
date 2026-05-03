var updateReportsTree = async (collection, userId, years, session) => {
  var sessionOpt = session ? { session } : {};
  var result = await collection.updateOne({ userId }, { $set: { years } }, { ...sessionOpt });

  return result.modifiedCount;
};

export default updateReportsTree;
