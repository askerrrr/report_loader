import { goodsModel } from "../models/index.js";

var saveListGoodsToDb = async (userId, listGoods, session) => await goodsModel.updateOne({ userId }, { $set: { listGoods } }, { session });

export default saveListGoodsToDb;
