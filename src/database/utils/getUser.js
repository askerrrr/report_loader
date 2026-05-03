var getUser = async (collection, userId, session) => await collection.findOne({ userId }, { session: session });

export default getUser;
