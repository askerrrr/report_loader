var dbUtils = require("../../../database/utils");
var { connection } = require("../../../database");
var reportProcessing = require("../utils/reportProcessing");
var reportPeriods = require("../../../dateUtils/reportPeriods");
var filteringOfRequiredReportPeriods = require("../utils/filteringOfRequiredReportPeriods");
var { getLastMondayFromCurrentMonth } = require("../../../dateUtils/getLastMondayFromCurrentMonth");

var noDataForPeriodMessage = "there is no data available for the selected reporting period";

var loadFreshReports = async (req, res, next) => {
  var users = await dbUtils.getUsersData();

  for (var { userId } of users) {
    var session = await connection.startSession();

    try {
      await session.withTransaction(async () => {
        var userLoadingStates = await dbUtils.getUser(userId, session);
        var { reportTree } = await dbUtils.getReportsTree(userId, session);
        var { freshReportPeriodIndex } = await dbUtils.getFreshReportPeriodIndex(userId, session);

        if (freshReportPeriodIndex < 0) {
          var { lastMonday } = getLastMondayFromCurrentMonth();
          freshReportPeriodIndex = reportPeriods.findIndex((item) => item.dateFrom === lastMonday);
        }

        var reportPeriodToLoad = reportPeriods[freshReportPeriodIndex];
        var nextReportPeriodIndex = freshReportPeriodIndex + 1;
        var { filteredRequiredReportPeriods } = filteringOfRequiredReportPeriods(userLoadingStates, [reportPeriodToLoad], reportTree);

        var { dateFrom, dateTo } = reportPeriodToLoad;

        if (!filteredRequiredReportPeriods.length) {
          await dbUtils.updateFreshReportPeriodIndex(userId, nextReportPeriodIndex, session);
          throw new Error("EMPTY_QUEUE");
        }

        var { loadingInProgress } = await dbUtils.getLoadingProgressStatus(userId, session);

        if (loadingInProgress) {
          await dbUtils.pushToReportsQueue(userId, [reportPeriods[freshReportPeriodIndex]], session);
          throw new Error("LOADING_IN_PROGRESS");
        }

        var { token } = await dbUtils.getToken(userId, session);

        try {
          await reportProcessing(userId, dateFrom, dateTo, token, session);
          await dbUtils.updateFreshReportPeriodIndex(userId, nextReportPeriodIndex, session);
        } catch (processingError) {
          if (processingError.message === noDataForPeriodMessage) {
            return;
          }

          throw processingError;
        }
      });
    } catch (err) {
      console.error({ err });

      if (err.message === "EMPTY_QUEUE" || err.message === "LOADING_IN_PROGRESS") {
        continue;
      }
    } finally {
      if (session) {
        await session.endSession();
      }
    }
  }
};

module.exports = loadFreshReports;
