var getListGoodsFromDb = async (collection, userId, session) => {
  var { listGoods } = await collection.findOne({ userId }, { session: session });

  return { listGoods };
};

export default getListGoodsFromDb;
