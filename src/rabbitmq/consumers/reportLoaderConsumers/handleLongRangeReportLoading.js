import dbUtils from "../../../database/utils/index.js";
import getRequiredReportPeriods from "../../../routes/index/utils/getRequiredReportPeriods.js";
import filteringOfRequiredReportPeriods from "../../../routes/index/utils/filteringOfRequiredReportPeriods.js";

var handleLongRangeReportLoading = async (data, session) => {
  var { userId, dateFrom, dateTo, needToLoadAllReports } = data;
  var { requiredReportPeriods } = getRequiredReportPeriods(
    dateFrom,
    dateTo,
    needToLoadAllReports,
  );

  var userReportLoadingState = await dbUtils.getUserReportLoadingState(
    userId,
    session,
  );
  var savedReportPeriods = (await dbUtils.getReportPeriods(userId, session))
    .reportPeriods;

  var { filteredRequiredReportPeriods, abandonedReportsAddedToQueue } =
    filteringOfRequiredReportPeriods(
      userReportLoadingState,
      requiredReportPeriods,
      savedReportPeriods,
    );

  if (!filteredRequiredReportPeriods.length) {
    return;
  }

  if (abandonedReportsAddedToQueue) {
    await dbUtils.resetAbandonedReports(userId, session);
  }

  await dbUtils.pushToReportsQueue(
    userId,
    filteredRequiredReportPeriods,
    session,
  );

  var { loadingInProgress, isReportLoadingIsStopped } = userReportLoadingState;

  if (loadingInProgress || isReportLoadingIsStopped) {
    return;
  }
};

export default handleLongRangeReportLoading;
