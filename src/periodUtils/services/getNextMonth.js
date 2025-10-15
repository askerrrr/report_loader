var getNextMonth = (currentMonth) => {
  var nextMonth;

  if (currentMonth < 9) {
    nextMonth = "0" + (currentMonth + 1);
  } else {
    nextMonth = currentMonth + 1 + "";
  }

  return { nextMonth };
};

module.exports = getNextMonth;
