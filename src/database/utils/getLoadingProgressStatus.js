var getLoadingProgressStatus = async (collection, userId) => {
  var { loadingInProgress } = await collection.findOne({ userId });

  return { loadingInProgress };
};

module.exports = getLoadingProgressStatus;
