import { errorLogger } from "../logger.js";

var errorHandler = async (err, req, res, next) => {
  errorLogger.info({ err });
  res.sendStatus(500);
};

export default errorHandler;
