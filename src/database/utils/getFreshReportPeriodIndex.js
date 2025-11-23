var { DatabaseError } = require("../../customError");

var getFreshReportPeriodIndex = async (collection, userId) => {
  try {
    var { freshReportPeriodIndex } = await collection.findOne({ userId }, { freshReportPeriodIndex: 1, _id: 0, loadedReports: 0 });
    return { freshReportPeriodIndex };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getFreshReportPeriodIndex;
