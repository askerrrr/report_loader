var monthsList = ["декабрь", "ноябрь", "октябрь", "сентябрь", "август", "июль", "июнь", "май", "апрель", "март", "февраль", "январь"];

var getMonthNameAndIndex = (monthNum) => {
  var monthName = monthsList[monthsList.length - monthNum];
  var monthIndex = monthsList.indexOf(monthName);
  return { monthName, monthIndex };
};

module.exports = getMonthNameAndIndex;
