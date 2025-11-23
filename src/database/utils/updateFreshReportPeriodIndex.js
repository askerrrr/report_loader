var { DatabaseError } = require("../../customError");

var updateFreshReportPeriodIndex = async (collection, userId, nextReportPeriodIndex, session) => {
  try {
    var result;

    if (session) {
      result = await collection.updateOne({ userId }, { $set: { freshReportPeriodIndex: nextReportPeriodIndex } }, { session: session });
    } else {
      result = await collection.updateOne({ userId }, { $set: { freshReportPeriodIndex: nextReportPeriodIndex } });
    }

    return result;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = updateFreshReportPeriodIndex;
