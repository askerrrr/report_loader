import Joi from "joi";
import loader from "../utils/loader.js";

var schema = Joi.object({ userId: Joi.string().required() });

var resumeAbandonedReportsLoading = async (req, res) => {
  var authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  var [type, secretKey] = authHeader.split(" ");

  if (type !== "Bearer" || secretKey !== process.env.SECRET_KEY) {
    return res.sendStatus(401);
  }

  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  res.sendStatus(202);

  var { userId } = req.body;

  loader(userId);
};

export default resumeAbandonedReportsLoading;
