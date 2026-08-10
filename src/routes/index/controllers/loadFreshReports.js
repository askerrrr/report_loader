import isFutureDate from "../utils/isFutureDate.js";
import { dbClient } from "../../../database/index.js";
import dbUtils from "../../../database/utils/index.js";
import { WBAPIError } from "../../../customError/index.js";
import checkTokenExpiry from "../utils/checkTokenExpiry.js";
import reportsProcessing from "../utils/reportsProcessing.js";
import reportPeriods from "../../../dateUtils/reportPeriods.js";
import isLastRequestTooRecent from "../utils/isLastRequestTooRecent.js";
import freshReportPeriodIndexIsInvalid from "../utils/freshReportPeriodIndexIsInvalid.js";
import filteringOfRequiredReportPeriods from "../utils/filteringOfRequiredReportPeriods.js";
import { getLastMondayFromCurrentMonth } from "../../../dateUtils/getLastMondayFromCurrentMonth.js";

var MAX_FAILED_ATTEMPTS = 5;
var mskTimeOffsetInMs = 10_800_000;
var statusOfReportLoadingStop = true;
var WB_API_REQUEST_INTERVAL_MS = 65_000;
var nextReportDelay = async (delayMs) => new Promise((res) => setTimeout(res, delayMs));

var loadFreshReports = async (req, res, next) => {
  var authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  var [type, secretKey] = authHeader.split(" ");

  if (type !== "Bearer" || secretKey !== process.env.SECRET_KEY) {
    return res.sendStatus(401);
  }

  var users = await dbUtils.getUsersData();

  if (!users.length) {
    return res.sendStatus(200);
  }

  console.log("FRESH_REPORTS_LOADING_STARTED", "\nTIME: " + new Date(Date.now() + mskTimeOffsetInMs));

  var queueIsEmpty = false;

  users.forEach((user) => (user.failedCount = 0));

  res.sendStatus(202);

  while (true) {
    var user = users.shift();
    var { userId } = user;

    var session = dbClient.startSession();

    try {
      await session.withTransaction(async () => {
        var { token } = await dbUtils.getToken(userId, session);

        if (!token) {
          var loadingStopReason = "isTokenMissing";
          await dbUtils.updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason, session);
        } else {
          var tokenIsExpired = checkTokenExpiry(token);

          if (tokenIsExpired) {
            var loadingStopReason = "tokenIsExpired";
            await dbUtils.updateReportLoadingStoppedStatus(userId, statusOfReportLoadingStop, loadingStopReason, session);
          } else {
            var { reportTree } = await dbUtils.getReportsTree(userId, session);
            var freshReportPeriodIndex = user?.freshReportPeriodIndex;

            if (freshReportPeriodIndexIsInvalid(freshReportPeriodIndex)) {
              var { lastMonday } = getLastMondayFromCurrentMonth();
              freshReportPeriodIndex = reportPeriods.findIndex((item) => item.dateFrom === lastMonday);
            }

            var reportPeriodToLoad = reportPeriods[freshReportPeriodIndex];
            var nextReportPeriodIndex = freshReportPeriodIndex + 1;

            if (isFutureDate(reportPeriodToLoad.dateTo)) {
              var prevReportPeriodIndex = freshReportPeriodIndex - 1;
              reportPeriodToLoad = reportPeriods[prevReportPeriodIndex];
              nextReportPeriodIndex = freshReportPeriodIndex;
            }

            var { filteredRequiredReportPeriods } = filteringOfRequiredReportPeriods(user, [reportPeriodToLoad], reportTree);

            if (filteredRequiredReportPeriods.length) {
              if (!user.loadingInProgress || !user.isReportLoadingDelayed) {
                try {
                  var { dateFrom, dateTo } = reportPeriodToLoad;

                  var { needToDalay, delayInMs } = isLastRequestTooRecent(user.lastReportRequestTimestamp, WB_API_REQUEST_INTERVAL_MS);

                  if (needToDalay) {
                    await nextReportDelay(delayInMs);
                  }

                  var { reportPeriodIsEmpty } = await reportsProcessing(userId, dateFrom, dateTo, token, session);

                  if (!reportPeriodIsEmpty) {
                    await dbUtils.updateLastReportRequestTimestamp(userId, session);
                    await dbUtils.updateFreshReportPeriodIndex(userId, nextReportPeriodIndex, session);
                  } else {
                    await dbUtils.addReportToEmptyReportPeriods(userId, freshReportPeriodIndex, dateFrom, dateTo, session);
                  }
                } catch (processingError) {
                  console.log({ processingError });
                  if (processingError instanceof WBAPIError) {
                    if (user.failedCount !== MAX_FAILED_ATTEMPTS) {
                      user.failedCount += 1;
                      users.push(user);
                    }
                  } else {
                    throw processingError;
                  }
                }
              } else {
                await dbUtils.pushToReportsQueue(userId, [reportPeriods[freshReportPeriodIndex]], session);
              }
            } else {
              await dbUtils.updateFreshReportPeriodIndex(userId, nextReportPeriodIndex, session);
            }
          }
        }
      });
    } catch (err) {
      console.error({ err });
    } finally {
      if (session) {
        await session.endSession();
      }
    }

    if (!users.length) {
      console.log("FRESH_REPORTS_LOADING_COMPLETED", "\nTIME: " + new Date(Date.now() + mskTimeOffsetInMs));
      break;
    }
  }
};

export default loadFreshReports;
