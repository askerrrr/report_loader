var { DatabaseError } = require("../../customError");

var getFreshReportPeriodIndex = async (collection, userId, session) => {
  try {
    var { freshReportPeriodIndex } = await collection.findOne({ userId }, { freshReportPeriodIndex: 1, _id: 0 }, { session: session });
    return { freshReportPeriodIndex };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getFreshReportPeriodIndex;
