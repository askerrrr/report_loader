import loader from "./loader.js";
import dbUtils from "../../../database/utils/index.js";

var isServerStartupLoad = true;

var resumeInterruptedReportsLoad = async () => {
  var users = await dbUtils.getUsersReportLoadingState();

  if (users.length) {
    for (var { userId, reportsQueue, isReportLoadingIsStopped } of users) {
      if (reportsQueue.length && !isReportLoadingIsStopped) {
        loader(userId, isServerStartupLoad);
      }
    }
  }
};

export default resumeInterruptedReportsLoad;
