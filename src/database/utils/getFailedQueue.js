var getFailedReports = async (collection, userId) => {
  var { failedReports } = await collection.findOne({ userId });

  return { failedReports };
};

module.exports = getFailedReports;
