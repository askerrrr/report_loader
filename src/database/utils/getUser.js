import { userModel } from "../models/index.js";

var getUser = async (userId, session) => {
  var sessionOpt = session ? { session } : {};
  var user = await userModel.findOne({ userId }, null, { ...sessionOpt });
  return user;
};
export default getUser;
