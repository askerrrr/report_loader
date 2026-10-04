import { userModel } from "../models/index.js";

var getUser = async (userId, session) => {
  var sessionOpt = session ? { session } : {};

  var user = await userModel.findOne(
    { userId },
    { _id: 0, passwd: 0 },
    { ...sessionOpt },
  );

  return user;
};
export default getUser;
