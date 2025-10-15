var getNextYearDate = (nextYear) => new Date([nextYear, "01", "15"].join("-"));

module.exports = getNextYearDate;
