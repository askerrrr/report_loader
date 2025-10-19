var failedLoader = require("../routes/index/utils/failedLoader");

var retryFailedReports = async (dbUtils) => {
  var users = await dbUtils.getUsersData();

  Promise.all(
    users.map(async ({ userId, failedReports, loadingInProgress }) => {
      try {
        if (!loadingInProgress && failedReports.length) {
          var { token } = await dbUtils.getToken(userId);
        }
      } catch (e) {
        console.log({ retryError: e });
      }
    })
  );
};

module.exports = retryFailedReports;
