var saveListGoodsToDb = async (collection, userId, listGoods, session) =>
  await collection.updateOne({ userId }, { $set: { listGoods } }, { session });

export default saveListGoodsToDb;
