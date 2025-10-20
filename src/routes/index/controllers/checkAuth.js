var checkAuth = async (req, res, next) => {
  var authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  var [type, secretKey] = authHeader.split(" ");

  if (type !== "Bearer" || secretKey !== process.env.SECRET_KEY) {
    return res.sendStatus(401);
  }

  var { getUser } = req.app.locals.db;

  var user = await getUser(req.body.userId);

  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }

  next();
};

module.exports = checkAuth;
