var addReportToAbandonedReports = async (collection, userId, reportPeriod) => {
  var result = await collection.updateOne({ userId }, { $push: { abandonedReports: reportPeriod } });
  return result;
};

module.exports = addReportToAbandonedReports;
