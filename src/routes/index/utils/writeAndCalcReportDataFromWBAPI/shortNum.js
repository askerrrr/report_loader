var shortNum = (num) => {
  var str = num + "";

  var strIncludesDot = str.split("").includes(".");

  if (!strIncludesDot) {
    return +str;
  }

  var [start, end] = str.split(".");

  var shortenedNum = +[start, end.slice(0, 2)].join(".");

  return shortenedNum;
};

module.exports = shortNum;
