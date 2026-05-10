var MAX_NESTED_ARR_LENGTH = 4;

export default splitReportPeriodsByIndexContinuity = (sortedReportPeriods) => {
  var firstReportPeriod = sortedReportPeriods.shift();

  var arrayOfContinuousIndexes = [];
  arrayOfContinuousIndexes.push([firstReportPeriod]);

  for (var period of sortedReportPeriods) {
    var lastNestedArrayOfContinuousIndexes = arrayOfContinuousIndexes[arrayOfContinuousIndexes.length - 1];
    var lastItemOfNestedArray = lastNestedArrayOfContinuousIndexes[lastNestedArrayOfContinuousIndexes.length - 1];

    var prevIndex = lastItemOfNestedArray.index;
    var nextIndex = period.index;

    var indexesIsEqual = prevIndex + 1 === nextIndex;

    if (indexesIsEqual && lastNestedArrayOfContinuousIndexes.length < MAX_NESTED_ARR_LENGTH) {
      lastNestedArrayOfContinuousIndexes.push(period);
    } else {
      arrayOfContinuousIndexes.push([period]);
    }
  }

  return { arrayOfContinuousIndexes };
};
