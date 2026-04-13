import loader from "../utils/loader.js";
import dbUtils from "../../../database/utils/index.js";

var reportLoading = async (req, res, next) => {
  var { userId } = req.body;
  var { token } = await dbUtils.getToken(userId);

  await loader(userId, token);
};

export default reportLoading;
