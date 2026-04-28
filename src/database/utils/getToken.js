import { DatabaseError } from "../../customError/index.js";

var getToken = async (collection, userId, session) => {
  var sessionOpt = session ? { session } : {};
  var { token } = await collection.findOne({ userId }, { ...sessionOpt });
  return { token };
};

export default getToken;
