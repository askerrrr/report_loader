import getDateToByDateFrom from "./getDateToByDateFrom.js";

var getFullPeriods = (mondays) =>
  mondays.map((monday, index) => {
    var sunday = getDateToByDateFrom(monday);
    return { dateFrom: monday, dateTo: sunday, index, failedCount: 0 };
  });

export default getFullPeriods;
