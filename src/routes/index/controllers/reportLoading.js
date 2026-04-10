import loader from "../utils/loader.js";

var reportLoading = async (req, res, next) => {
  var { userId } = req.body;
  var { getToken } = req.app.locals.db;
  var { token } = await getToken(userId);

  await loader(userId, token);
};

export default reportLoading;
