import dbUtils from "../../../database/utils/index.js";

var checkAuth = async (req, res, next) => {
  var authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  var [type, secretKey] = authHeader.split(" ");

  if (type !== "Bearer" || secretKey !== process.env.SECRET_KEY) {
    return res.sendStatus(401);
  }

  var user = await dbUtils.getUser(req.body.userId);

  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }

  next();
};

export default checkAuth;
