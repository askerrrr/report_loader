import dbUtils from "../../../database/utils/index.js";
import { dbClient } from "../../../database/index.js";
import reportsProcessing from "../utils/reportsProcessing.js";
import reportPeriods from "../../../dateUtils/reportPeriods.js";
import freshReportPeriodIndexIsInvalid from "../utils/freshReportPeriodIndexIsInvalid.js";
import filteringOfRequiredReportPeriods from "../utils/filteringOfRequiredReportPeriods.js";
import { getLastMondayFromCurrentMonth } from "../../../dateUtils/getLastMondayFromCurrentMonth.js";

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

  for (var user of users) {
    var { userId } = user;
    var session = dbClient.startSession();

    try {
      await session.withTransaction(async () => {
        var { reportTree } = await dbUtils.getReportsTree(userId, session);
        var freshReportPeriodIndex = user.freshReportPeriodIndex;

        if (freshReportPeriodIndexIsInvalid(freshReportPeriodIndex)) {
          var { lastMonday } = getLastMondayFromCurrentMonth();
          freshReportPeriodIndex = reportPeriods.findIndex((item) => item.dateFrom === lastMonday);
        }

        var reportPeriodToLoad = reportPeriods[freshReportPeriodIndex];
        var nextReportPeriodIndex = freshReportPeriodIndex + 1;
        var { filteredRequiredReportPeriods } = filteringOfRequiredReportPeriods(user, [reportPeriodToLoad], reportTree);

        if (!filteredRequiredReportPeriods.length) {
          await dbUtils.updateFreshReportPeriodIndex(userId, nextReportPeriodIndex, session);
          throw new Error("EMPTY_QUEUE");
        }

        if (user.loadingInProgress || user.isReportLoadingDelayed) {
          await dbUtils.pushToReportsQueue(userId, [reportPeriods[freshReportPeriodIndex]], session);
          throw new Error("LOADING_IN_PROGRESS");
        }

        var { token } = await dbUtils.getToken(userId, session);

        if (!token) {
          throw new Error("WBTOKEN is empty");
        }

        try {
          var { dateFrom, dateTo } = reportPeriodToLoad;
          await reportsProcessing(userId, dateFrom, dateTo, session);
          await dbUtils.updateLastReportRequestTimestamp(userId, session);
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

      if (err.message === "EMPTY_QUEUE" || err.message === "LOADING_IN_PROGRESS" || err.message === "WBTOKEN is empty") {
        continue;
      }
    } finally {
      if (session) {
        await session.endSession();
      }
    }
  }
};

export default loadFreshReports;
