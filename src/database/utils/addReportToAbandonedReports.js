var { DatabaseError } = require("../../customError");

var addReportToAbandonedReports = async (collection, userId, reportPeriod, session) => {
  try {
    await collection.updateOne({ userId }, { $push: { abandonedReports: reportPeriod } }, { session: session });
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = addReportToAbandonedReports;
