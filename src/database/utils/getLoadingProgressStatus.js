import { DatabaseError } from "../../customError/index.js";

var getLoadingProgressStatus = async (collection, userId, session) => {
  try {
    var { loadingInProgress } = await collection.findOne({ userId }, { session });

    return { loadingInProgress };
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default getLoadingProgressStatus;
