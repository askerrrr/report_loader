import { tokenModel } from "../models/index.js";

var getToken = async (userId, session) => {
  var sessionOpt = session ? { session } : {};
  var { token } = await tokenModel.findOne({ userId, type: "read" }, null, {
    ...sessionOpt,
  });

  return { token };
};

export default getToken;
