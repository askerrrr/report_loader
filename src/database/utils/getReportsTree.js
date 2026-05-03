var getReportsTree = async (collection, userId, session) => {
  var { years } = await collection.findOne({ userId }, { session: session });

  return { reportTree: years };
};

export default getReportsTree;
