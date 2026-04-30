import loader from "../utils/loader.js";

var reportLoading = async (req, res, next) => {
  var { userId } = req.body;

  await loader(userId, token);
};

export default reportLoading;
