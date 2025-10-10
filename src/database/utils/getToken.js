var getToken = async (collection, userId) => {
  var { token } = await collection.findOne({ userId });
  return { token };
};

module.exports = getToken;
