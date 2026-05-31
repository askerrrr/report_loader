var getUser = async (collection, userId, session) => {
  var sessionOpt = session ? { session } : {};
  var user = await collection.findOne({ userId }, { ...sessionOpt });
  return user;
};
export default getUser;
