var dbUtils = require("../database/utils");
var failedLoader = require("../routes/index/utils/failedLoader");

var retryFailedReports = async () => {
  var users = await dbUtils.getUsersData();

  Promise.all(
    users.map(async ({ userId, failedReports, loadingInProgress }) => {
      try {
        if (!loadingInProgress && failedReports.length) {
          var { token } = await dbUtils.getToken(userId);

          await failedLoader(userId, token);
        }
      } catch (e) {
        console.log({ retryError: e });
      }
    })
  );
};

module.exports = retryFailedReports;
