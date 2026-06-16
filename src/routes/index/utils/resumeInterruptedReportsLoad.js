import loader from "./loader.js";
import dbUtils from "../../../database/utils/index.js";

var resumeInterruptedReportsLoad = async () => {
  var users = await dbUtils.getUsersData();

  if (!users.length) {
    return;
  }

  for (var { userId, reportsQueue } of users) {
    if (!reportsQueue.length) {
      continue;
    }

    loader(userId);
  }
};

export default resumeInterruptedReportsLoad;
