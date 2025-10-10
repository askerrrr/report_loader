var getUsersData = async (collection) => {
  var data = await collection.find();

  return data.map((user) => {
    return { userId: user.userId, failedReports: user.failedReports, loadingInProgress: user.loadingInProgress };
  });
};

module.exports = getUsersData;
