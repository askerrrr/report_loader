var updateReportLoadingFields = async (collection, userId, updatedFields) => {
  await collection.updateOne({ userId }, { $set: { ...updatedFields } });
};

export default updateReportLoadingFields;
