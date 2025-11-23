var dbUtils = require("../../../database/utils");
var reportProcessing = require("../utils/reportProcessing");
var reportPeriods = require("../../../dateUtils/reportPeriods");
var filteringOfRequiredReportPeriods = require("../utils/filteringOfRequiredReportPeriods");
var { getLastMondayFromCurrentMonth } = require("../../../dateUtils/getLastMondayFromCurrentMonth");

var loadFreshReports = async (req, res, next) => {
  var users = await dbUtils.getUsersData();

  for (var { userId } of users) {
    var userLoadingStates = await dbUtils.getUser(userId);
    var { reportTree } = await dbUtils.getReportsTree(userId);
    var { freshReportPeriodIndex } = await dbUtils.getFreshReportPeriodIndex(userId);

    if (!freshReportPeriodIndex) {
      var { lastMonday } = getLastMondayFromCurrentMonth();
      freshReportPeriodIndex = reportPeriods.findIndex((item) => item.dateFrom === lastMonday);
    }

    var nextReportPeriodIndex = freshReportPeriodIndex + 1;
    var reportPeriodToLoad = reportPeriods[freshReportPeriodIndex];

    var { filteredRequiredReportPeriods } = filteringOfRequiredReportPeriods(userLoadingStates, [reportPeriodToLoad], reportTree);

    var { dateFrom, dateTo } = reportPeriodToLoad;

    if (!filteredRequiredReportPeriods.length) {
      await dbUtils.updateFreshReportPeriodIndex(userId, nextReportPeriodIndex); //add session ;
      continue;
    }

    var { loadingInProgress } = await dbUtils.getLoadingProgressStatus(userId);
    console.log({ loadingInProgress });

    if (loadingInProgress) {
      await dbUtils.pushToReportsQueue(userId, reportPeriods[freshReportPeriodIndex]);
      return;
    }

    console.log({ freshReportPeriodIndex, dateFrom, dateTo });
    var token = await dbUtils.getToken(userId);
    await reportProcessing(userId, dateFrom, dateTo, token);
  }
};

module.exports = loadFreshReports;
