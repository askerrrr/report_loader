import loader from "../utils/loader.js";

var reportLoading = async (req, res, next) => await loader(req.body.userId);

export default reportLoading;
