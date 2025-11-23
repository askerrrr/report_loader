var { DatabaseError } = require("../../customError");

var addReportToAbandonedReports = async (collection, userId, reportPeriod, session) => {
  try {
    var result;

    if (session) {
      result = await collection.updateOne({ userId }, { $push: { abandonedReports: reportPeriod } }, { session: session });
    } else {
      result = await collection.updateOne({ userId }, { $push: { abandonedReports: reportPeriod } });
    }

    return result;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = addReportToAbandonedReports;
