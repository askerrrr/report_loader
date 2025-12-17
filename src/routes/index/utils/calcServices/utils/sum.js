var truncateNum = require("../../reportParsing/truncateNum");

/**
 * @param {'truncate-on' | 'truncate-off'} truncate
 */

var sum = (data, filedName, truncate) => {
  var result = data.reduce((acc, i) => acc + (i?.[filedName] ?? 0), 0);

  if (truncate === "truncate-on") {
    return truncateNum(result);
  }
  return result;
};

module.exports = sum;
