var getUser = async (collection, userId) => {
  var user = await collection.findOne({ userId });
  return user;
};

module.exports = getUser;
