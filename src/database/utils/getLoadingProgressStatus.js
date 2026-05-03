var getLoadingProgressStatus = async (collection, userId, session) => {
  var { loadingInProgress } = await collection.findOne({ userId }, { session });

  return { loadingInProgress };
};

export default getLoadingProgressStatus;
