var oneHourMs = 3_600_000;
var dayShiftHourOffset = 1;

var getPrevDayDate = () => {
  var currentDayTimestamp = Date.now();
  var currentDayHour = new Date().getHours();

  var prevDayTimestamp = currentDayTimestamp - (currentDayHour + dayShiftHourOffset) * oneHourMs;
  var prevDayDate = new Date(prevDayTimestamp).toISOString().split("T")[0];
  return { prevDayDate };
};

export default getPrevDayDate;
