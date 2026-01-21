var loader = require("./loader");
var dbUtils = require("../../../database/utils");
var { connection } = require("../../../database");

var killAllSessions = async () =>
  connection
    .db("admin")
    .command({ killAllSessions: [] })
    .then(() => console.log("all sessions killed"));

var resumeInterruptedReportsLoad = async () => {
  await killAllSessions();

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
