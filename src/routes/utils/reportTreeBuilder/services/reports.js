var { getMonthNameAndIndex } = require("./month");
var { getMondayIndex, getMondaysQtyInMonth } = require("./monday");

var setReportIdInReports = async (
  date,
  reportIds,
  reportId,
  fullPeriod,
  monthCarry = null
) => {
  var mondayIndex = await getMondayIndex(date);

  if (monthCarry) {
    var mondaysQty = await getMondaysQtyInMonth(date);
    reportIds[mondaysQty] = { reportId, ...fullPeriod };

    return reportIds;
  }

  reportIds[mondayIndex] = { reportId, ...fullPeriod };

  return reportIds;
};

var getReportsFromMonth = async (months, monthNum) => {
  var { monthIndex } = await getMonthNameAndIndex(monthNum);

  var { reportIds } = months[monthIndex];

  return reportIds;
};

module.exports = {
  getReportsFromMonth,
  setReportIdInReports,
};
