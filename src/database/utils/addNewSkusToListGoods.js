var addNewSkusToListGoods = async (collection, userId, newSkus, session) => {
  var result = await collection.updateOne({ userId }, { $push: { listGoods: { $each: [...newSkus] } } }, { session: session });
  return result;
};

export default addNewSkusToListGoods;
