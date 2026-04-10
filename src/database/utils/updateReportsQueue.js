import { DatabaseError } from "../../customError/index.js";

var updateReportsQueue = async (collection, userId, reportToUpload, session) => {
  try {
    await collection.updateOne({ userId }, { $push: { reportsQueue: reportToUpload } }, { session: session });
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default updateReportsQueue;
