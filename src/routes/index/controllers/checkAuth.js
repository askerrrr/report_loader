var env = require("../../../env");

var checkAuth = (req, res, next) => {
  var authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  var [type, secretKey] = authHeader.split(" ");

  if (type !== "Bearer" || secretKey !== env.secretKey) {
    return res.sendStatus(401);
  }

  next();
};

module.exports = checkAuth;
