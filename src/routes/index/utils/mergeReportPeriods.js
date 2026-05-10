export default mergeReportPeriods = (arrayOfContinuousIndexes) => {
  var mergedReportPeriods = [];

  for (var i = 0; i < arrayOfContinuousIndexes.length; i++) {
    var { dateFrom } = arrayOfContinuousIndexes[i][0];

    var { dateTo, failedCount } = arrayOfContinuousIndexes[i].at(-1);

    var weeklyRange = arrayOfContinuousIndexes[i].map(({ dateFrom, dateTo }) => {
      return { dateFrom, dateTo };
    });

    mergedReportPeriods.push({ dateFrom, dateTo, failedCount, weeklyRange });
  }

  return { mergedReportPeriods };
};
