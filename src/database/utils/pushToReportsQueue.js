var pushToReportsQueue = async (collection, userId, periods, session) => {
  await collection.updateOne(
    { userId },
    { $push: { reportsQueue: { $each: [...periods] } }, $inc: { queueLength: periods.length, queueCapacity: periods.length } },
    { session: session },
  );
};

export default pushToReportsQueue;
