var setAllUsersLoadingFlag = async (collection) => await collection.updateOne({}, { $set: { loadingInProgress: true } });

export default setAllUsersLoadingFlag;
