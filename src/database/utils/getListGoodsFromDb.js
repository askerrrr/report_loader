import { WBAPIError } from "../../customError/index.js";

var getListGoodsFromDb = async (collection, userId, session) => {
  try {
    var { listGoods } = await collection.findOne({ userId }, { session: session });

    return { listGoods };
  } catch (e) {
    throw new WBAPIError(userId, 500, e);
  }
};

export default getListGoodsFromDb;
