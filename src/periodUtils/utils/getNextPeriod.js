var getNextPeriod = (currentYear, currentMonth) => {
  var nextMonth = currentMonth + 1;
  var nextPeriod;

  if (nextMonth > 12) {
    var nextYear = currentYear + 1;
    nextPeriod = [nextYear, "01", "00"].join("-");
  } else {
    var nextMonthStr = String(nextMonth).padStart(2, "0");
    nextPeriod = [currentYear, nextMonthStr, "15"].join("-");
  }

  return { nextPeriod };
};

module.exports = getNextPeriod;
