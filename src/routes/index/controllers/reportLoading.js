import loader from "../utils/loader.js";

var reportLoading = async (req, res, next) => loader(req.body.userId);

export default reportLoading;
