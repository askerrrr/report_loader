import loader from "../utils/loader.js";

var resumeAbandonedReportsLoading = async (req, res) => {
  var authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  var [type, secretKey] = authHeader.split(" ");

  if (type !== "Bearer" || secretKey !== process.env.SECRET_KEY) {
    return res.sendStatus(401);
  }

  res.sendStatus(202);

  var { userId } = req.body;

  loader(userId);
};

export default resumeAbandonedReportsLoading;
