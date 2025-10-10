var hasPeriodOverlap = (year, month, day) => {
  var reportRange = 6;
  var daysInMonth = new Date(year, month, 0).getDate();

  var overlap = daysInMonth - day < reportRange;
  return overlap;
};

module.exports = hasPeriodOverlap;
