var isNextMonthReportNeeded = (dateFrom, dateTo) => {
  var [startYear, startMonth, startDay] = dateFrom.split("-");
  var [_, endMonth, endDay] = dateTo.split("-");

  if (startMonth === endMonth) {
    return;
  }

  var daysInCurrentMonth = new Date(startYear, startMonth, 0).getDate();

  var isCarryoverRequired = daysInCurrentMonth - startDay + 1 < +endDay;
  return isCarryoverRequired;
};

module.exports = isNextMonthReportNeeded;
