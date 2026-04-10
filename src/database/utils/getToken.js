import { DatabaseError } from "../../customError/index.js";

var getToken = async (collection, userId, session) => {
  try {
    if (session) {
      var { token } = await collection.findOne({ userId }, { session: session });
      return { token };
    } else {
      var { token } = await collection.findOne({ userId });
      return { token };
    }
  } catch (e) {
    throw new DatabaseError(userId, e);
  }
};

export default getToken;
