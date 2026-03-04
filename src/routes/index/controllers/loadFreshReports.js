var dbUtils = require("../../../database/utils");
var { connection } = require("../../../database");
var reportsProcessing = require("../utils/reportsProcessing");
var reportPeriods = require("../../../dateUtils/reportPeriods");
var filteringOfRequiredReportPeriods = require("../utils/filteringOfRequiredReportPeriods");
var { getLastMondayFromCurrentMonth } = require("../../../dateUtils/getLastMondayFromCurrentMonth");

var noDataForPeriodMessage = "there is no data available for the selected reporting period";

var loadFreshReports = async (req, res, next) => {
  var authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  var [type, secretKey] = authHeader.split(" ");

  if (type !== "Bearer" || secretKey !== process.env.SECRET_KEY) {
    return res.sendStatus(401);
  }

  if (!req.body?.isWeeklyLoadingOfFreshReport) {
    return;
  }

  var users = await dbUtils.getUsersData();

  if (!users.length) {
    return res.sendStatus(200);
  }

  res.sendStatus(202);

  for (var { userId } of users) {
    var session = await connection.startSession();

    try {
      await session.withTransaction(async () => {
        var userLoadingStates = await dbUtils.getUser(userId, session);
        var { reportTree } = await dbUtils.getReportsTree(userId, session);
        var { freshReportPeriodIndex, freshReportPeriodIndexIsExist } = await dbUtils.getFreshReportPeriodIndex(userId, session);

        if (!freshReportPeriodIndexIsExist || freshReportPeriodIndex < 0) {
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
          await reportsProcessing(userId, dateFrom, dateTo, token, session);
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
