import { DatabaseError } from "../../customError/index.js";

var updateReportsTree = async (collection, userId, years, session) => {
  try {
    var sessionOpt = session ? { session } : {};
    var result = await collection.updateOne({ userId }, { $set: { years } }, { ...sessionOpt });

    return result.modifiedCount;
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default updateReportsTree;
