var getFreshReportPeriodIndex = async (collection, userId) => {
  var { freshReportPeriodIndex } = await collection.findOne({ userId }, { freshReportPeriodIndex: 1, _id: 0, loadedReports: 0 });
  return { freshReportPeriodIndex };
};

module.exports = getFreshReportPeriodIndex;
