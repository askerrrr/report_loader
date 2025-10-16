var getMondayIndex = (date, mondays) => {
  var mondayIndex = mondays.findIndex((monday) => monday === new Date(date).toISOString());

  return mondayIndex === -1 ? { mondayIndex: 0 } : { mondayIndex };
};

module.exports = getMondayIndex;
