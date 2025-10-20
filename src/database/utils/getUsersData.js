var getUsersData = async (collection) => {
  var data = await collection.find({}).toArray();
  return data.map((user) => {
    return { userId: user.userId, failedReportsQueue: user.failedReportsQueue, loadingInProgress: user.loadingInProgress };
  });
};

module.exports = getUsersData;
