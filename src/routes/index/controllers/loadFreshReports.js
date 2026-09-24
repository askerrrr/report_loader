import parseJwt from "../utils/parseJwt.js";
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

var statusOfReportLoadingStop = true;
var WB_API_REQUEST_INTERVAL_MS = 65_000;
var nextReportDelay = async (delayMs) =>
  new Promise((res) => setTimeout(res, delayMs));

var loadFreshReports = async (req, res, next) => {
  var usersReportLoadingState = await dbUtils.getUsersReportLoadingState();

  if (!usersReportLoadingState.length) {
    return res.sendStatus(200);
  }

  console.log("FRESH_REPORTS_LOADING_STARTED", "\nTIME: " + new Date());

  usersReportLoadingState.forEach((user) => (user.failedCount = 0));

  res.sendStatus(202);

  while (true) {
    var user = usersReportLoadingState.shift();
    var { userId } = user;

    var session = await dbClient.startSession();

    try {
      await session.withTransaction(async () => {
        var { token } = await dbUtils.getToken(userId, session);

        if (!token) {
          var loadingStopReason = "isTokenMissing";
          await dbUtils.updateReportLoadingStoppedStatus(
            userId,
            statusOfReportLoadingStop,
            loadingStopReason,
            session,
          );
        } else {
          var tokenPayload = parseJwt(token);
          var { isExpired } = checkTokenExpiry(tokenPayload);

          if (isExpired) {
            var loadingStopReason = "tokenIsExpired";
            await dbUtils.updateReportLoadingStoppedStatus(
              userId,
              statusOfReportLoadingStop,
              loadingStopReason,
              session,
            );
          } else {
            var savedReportPeriodsFromDb = (
              await dbUtils.getReportPeriods(userId, session)
            ).reportPeriods;

            var freshReportPeriodIndex = user?.freshReportPeriodIndex;

            if (freshReportPeriodIndexIsInvalid(freshReportPeriodIndex)) {
              var { lastMonday } = getLastMondayFromCurrentMonth();
              freshReportPeriodIndex = reportPeriods.findIndex(
                (item) => item.dateFrom === lastMonday,
              );
            }

            var reportPeriodToLoad = reportPeriods[freshReportPeriodIndex];
            var nextReportPeriodIndex = freshReportPeriodIndex + 1;

            if (isFutureDate(reportPeriodToLoad.dateTo)) {
              var prevReportPeriodIndex = freshReportPeriodIndex - 1;
              reportPeriodToLoad = reportPeriods[prevReportPeriodIndex];
              nextReportPeriodIndex = freshReportPeriodIndex;
            }

            var { filteredRequiredReportPeriods } =
              filteringOfRequiredReportPeriods(
                user,
                [reportPeriodToLoad],
                savedReportPeriodsFromDb,
              );

            if (filteredRequiredReportPeriods.length) {
              if (!user.loadingInProgress) {
                try {
                  var { dateFrom, dateTo } = reportPeriodToLoad;

                  var { needToDelay, delayInMs } = isLastRequestTooRecent(
                    user.lastReportRequestTimestamp,
                    WB_API_REQUEST_INTERVAL_MS,
                  );

                  if (needToDelay) {
                    await nextReportDelay(delayInMs);
                  }

                  var { reportPeriodIsEmpty } = await reportsProcessing(
                    userId,
                    dateFrom,
                    dateTo,
                    token,
                    session,
                  );

                  if (!reportPeriodIsEmpty) {
                    await dbUtils.updateLastReportRequestTimestamp(
                      userId,
                      session,
                    );
                    await dbUtils.updateFreshReportPeriodIndex(
                      userId,
                      nextReportPeriodIndex,
                      session,
                    );
                  } else {
                    await dbUtils.addReportToEmptyReportPeriods(
                      userId,
                      freshReportPeriodIndex,
                      dateFrom,
                      dateTo,
                      session,
                    );
                  }
                } catch (processingError) {
                  console.log({ processingError });
                  if (processingError instanceof WBAPIError) {
                    if (user.failedCount !== MAX_FAILED_ATTEMPTS) {
                      user.failedCount += 1;
                      usersReportLoadingState.push(user);
                    }
                  } else {
                    throw processingError;
                  }
                }
              } else {
                await dbUtils.pushToReportsQueue(
                  userId,
                  [reportPeriods[freshReportPeriodIndex]],
                  session,
                );
              }
            } else {
              await dbUtils.updateFreshReportPeriodIndex(
                userId,
                nextReportPeriodIndex,
                session,
              );
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

    if (!usersReportLoadingState.length) {
      console.log("FRESH_REPORTS_LOADING_COMPLETED", "\nTIME: " + new Date());
      break;
    }
  }
};

export default loadFreshReports;
