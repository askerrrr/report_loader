var projection = {
  _id: 0,
  userId: 1,
  loadingInProgress: 1,
  reportsQueue: 1,
  abandonedReports: 1,
  isReportLoadingDelayed: 1,
  freshReportPeriodIndex: 1,
};

var getUsersData = async (collection) => await collection.find({}, { projection }).toArray();

export default getUsersData;
