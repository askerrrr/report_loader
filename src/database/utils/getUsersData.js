import { DatabaseError } from "../../customError/index.js";

var getUsersData = async (collection) => {
  try {
    var data = await collection.find({}).toArray();
    return data.map((user) => {
      return { userId: user.userId, loadingInProgress: user.loadingInProgress, reportsQueue: user.reportsQueue };
    });
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default getUsersData;
