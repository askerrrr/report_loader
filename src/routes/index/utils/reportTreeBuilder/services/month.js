var monthsList = ["декабрь", "ноябрь", "октябрь", "сентябрь", "август", "июль", "июнь", "май", "апрель", "март", "февраль", "январь"];

var getMonthNameAndIndex = (monthNum) => {
  return { monthIndex: monthsList.indexOf(month), monthName: monthsList[monthsList.length - monthNum] };
};

module.exports = { getMonthNameAndIndex };
