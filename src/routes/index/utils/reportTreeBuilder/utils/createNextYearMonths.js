  var firstMonthIndex = 11;
  var firstMonthName = "январь";
  var months = new Array(12).fill(null);
  
  var createNextYearMonths = (reportIds) => {
  months[firstMonthIndex] = { month: firstMonthName, reportIds };

  return months;
};

export default createNextYearMonths;
