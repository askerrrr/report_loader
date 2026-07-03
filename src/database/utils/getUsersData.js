var requredFields = {
  _id: 0,
  userId: 1,
  reportsQueue: 1,
  abandonedReports: 1,
  loadingInProgress: 1,
  isReportLoadingDelayed: 1,
  freshReportPeriodIndex: 1,
  isReportLoadingIsStopped: 1,
  emptyReportPeriodsIndexes: 1,
  lastReportRequestTimestamp: 1,
};

var getUsersData = async (collection) => await collection.find({}, { projection: requredFields }).toArray();

export default getUsersData;
