import { reportLoadingStateModel } from "../models/index.js";

var getFreshReportPeriodIndex = async (userId, session) => {
  var doc = await reportLoadingStateModel.findOne({ userId }, { freshReportPeriodIndex: 1, _id: 0 }, { session: session });

  return doc?.freshReportPeriodIndex
    ? { freshReportPeriodIndex: doc.freshReportPeriodIndex, freshReportPeriodIndexIsExist: true }
    : { freshReportPeriodIndex: -1, freshReportPeriodIndexIsExist: false };
};

export default getFreshReportPeriodIndex;
