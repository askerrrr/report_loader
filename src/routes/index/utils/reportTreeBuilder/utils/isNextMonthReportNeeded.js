var isNextMonthReportNeeded = (dateFrom, dateTo) => {
  var [startYear, startMonth, startDay] = dateFrom.split("-");
  var [_, endMonth, endDay] = dateTo.split("-");

  if (startMonth === endMonth) {
    return;
  }

  var daysInCurrentMonth = new Date(startYear, startMonth, 0).getDate();

  return daysInCurrentMonth - startDay + 1 < +endDay;
};

module.exports = isNextMonthReportNeeded;
