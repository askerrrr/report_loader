var truncateNum = require("./truncateNum");

var truncateTotals = (totals) => {
  var truncatedTotals = {};

  for (var key in totals) {
    truncatedTotals[key] = truncateNum(totals[key]);
  }

  return truncatedTotals;
};

module.exports = truncateTotals;
