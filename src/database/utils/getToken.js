import { tokenModel } from "../models/index.js";

var getToken = async (userId, session) => {
  var sessionOpt = session ? { session } : {};
  var data = await tokenModel.findOne({ userId, type: "read" }, null, {
    ...sessionOpt,
  });

  return { token: data?.token };
};

export default getToken;
