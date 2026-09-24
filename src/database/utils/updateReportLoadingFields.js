import { reportLoadingStateModel } from "../models/index.js";

var updateReportLoadingFields = async (userId, updatedFields) => {
  await collection.updateOne({ userId }, { $set: { ...updatedFields } });
};

export default updateReportLoadingFields;
