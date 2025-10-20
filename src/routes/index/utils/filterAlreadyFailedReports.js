var filterAlreadyFailedReports = (failedReports, incomingReports) => {
  var arr = [];

  while (incomingReports) {
    var elem = incomingReports.shift();
    if (!failedReports.includes(elem)) {
      arr.push(elem);
    }
  }

  return arr;
};

module.exports = filterAlreadyFailedReports;
