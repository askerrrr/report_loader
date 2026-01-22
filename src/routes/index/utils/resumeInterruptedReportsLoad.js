var loader = require("./loader");
var dbUtils = require("../../../database/utils");

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
    await loader(userId, token);
  }
};

module.exports = resumeInterruptedReportsLoad;
