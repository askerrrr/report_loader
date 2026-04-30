var pushToReportsQueue = async (collection, userId, periods, session) => {
  await collection.updateOne({ userId }, { $push: { reportsQueue: { $each: [...periods] } } }, { session: session });
};

export default pushToReportsQueue;
