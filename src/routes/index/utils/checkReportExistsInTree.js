var checkReportExistsInTree = (date, tree) => {
  var reportIsExist;

  for (var { months } of tree) {
    for (var item of months) {
      if (item) {
        if (item.reportIds.find((i) => i?.dateFrom == date)) {
          reportIsExist = true;
          break;
        }
      }
    }
  }
  return { reportIsExist };
};

module.exports = checkReportExistsInTree;
