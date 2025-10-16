var createNextYearMonths = (reportIds) => {
  var firstMonthIndex = 11;
  var firstMonthName = "январь";

  var months = new Array(12).fill(null);

  months[firstMonthIndex] = { month: firstMonthName, reportIds };

  return months;
};

module.exports = createNextYearMonths;
