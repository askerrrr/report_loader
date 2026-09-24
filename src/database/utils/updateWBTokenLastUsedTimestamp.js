import { tokenModel } from "../models/index.js";

var updateWBTokenLastUsedTimestamp = async (userId, session) => {
  var sessionOpt = session ? { session: session } : {};
  await tokenModel.updateOne({ userId }, { $set: { lastUsed: Date.now() } }, { ...sessionOpt });
};

export default updateWBTokenLastUsedTimestamp;
