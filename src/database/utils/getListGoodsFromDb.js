var { WBAPIError } = require("../../customError");

var getListGoodsFromDb = async (collection, userId, session) => {
  try {
    var { listGoods } = await collection.findOne({ userId }, null, { session: session });

    return { listGoods };
  } catch (e) {
    throw new WBAPIError(userId, 500, e);
  }
};

module.exports = getListGoodsFromDb;
