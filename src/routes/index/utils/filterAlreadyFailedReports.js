var filterAlreadyFailedReports = (failedReportsQueue, incomingReports) => {
  var arr = [];

  while (incomingReports) {
    var elem = incomingReports.shift();
    if (!failedReportsQueue.includes(elem)) {
      arr.push(elem);
    }
  }

  return arr;
};

module.exports = filterAlreadyFailedReports;
