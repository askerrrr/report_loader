var setAllUsersLoadingFlag = async (collection) => await collection.updateOne({}, { $set: { loadingInProgress: true } });

module.exports = setAllUsersLoadingFlag;
