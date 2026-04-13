import truncateNum from "./truncateNum.js";

var truncateTotals = (totals) => {
  var truncatedTotals = {};

  for (var key in totals) {
    truncatedTotals[key] = truncateNum(totals[key]);
  }

  return truncatedTotals;
};

export default truncateTotals;
