var { WBAPIError } = require("../../customError");

var saveListGoodsToDb = async (collection, userId, listGoods, session) => {
  try {
    var result;

    if (session) {
      result = await collection.updateOne({ userId }, { $set: { listGoods } }, { session: session });
    } else {
      result = await collection.updateOne({ userId }, { $set: { listGoods } });
    }

    return result;
  } catch (e) {
    throw new WBAPIError(userId, 500, e);
  }
};

module.exports = saveListGoodsToDb;
