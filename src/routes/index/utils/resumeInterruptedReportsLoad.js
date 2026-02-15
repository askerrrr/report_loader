var loader = require("./loader");
var dbUtils = require("../../../database/utils");

var isServerStartupLoad = true;

var resumeInterruptedReportsLoad = async () => {
  var users = await dbUtils.getUsersData();

  if (!users.length) {
    return;
  }

  for (var { userId, reportsQueue } of users) {
    if (!reportsQueue.length) {
      continue;
    }

    var { token } = await dbUtils.getToken(userId);
    loader(userId, token, isServerStartupLoad);
  }
};

module.exports = resumeInterruptedReportsLoad;
