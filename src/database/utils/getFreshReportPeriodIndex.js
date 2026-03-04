var { DatabaseError } = require("../../customError");

var getFreshReportPeriodIndex = async (collection, userId, session) => {
  try {
    var doc = await collection.findOne({ userId }, { freshReportPeriodIndex: 1, _id: 0 }, { session: session });

    return doc?.freshReportPeriodIndex
      ? { freshReportPeriodIndex: doc.freshReportPeriodIndex, freshReportPeriodIndexIsExist: true }
      : { freshReportPeriodIndex: -1, freshReportPeriodIndexIsExist: false };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

module.exports = getFreshReportPeriodIndex;
