var getMonthMondays = async (reportsDate) => {
  var date = new Date(reportsDate);
  var month = date.getMonth();
  var mondays = [];

  date.setDate(1);

  while (date.getDay() !== 1) {
    date.setDate(date.getDate() + 1);
  }

  while (date.getMonth() === month) {
    var monday = new Date(date.getTime()).toISOString();
    mondays.push(monday);

    date.setDate(date.getDate() + 7);
  }

  return mondays.reverse();
};

var getMondayIndex = async (date) => {
  var mondays = await getMonthMondays(date);

  var mondayIndex = mondays.findIndex((monday) => monday === new Date(date).toISOString());

  return mondayIndex === -1 ? 0 : mondayIndex;
};

var getMondaysQtyInMonth = async (date) => {
  var mondays = await getMonthMondays(date);
  return mondays.length;
};

module.exports = { getMondayIndex, getMonthMondays, getMondaysQtyInMonth };
