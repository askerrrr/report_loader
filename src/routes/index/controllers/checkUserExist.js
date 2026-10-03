import dbUtils from "../../../database/utils/index.js";

var checkUserExist = async (req, res, next) => {
  var user = await dbUtils.getUser(req.body.userId);

  if (!user) {
    return res.status(404);
  }

  res.sendStatus(202);

  next();
};

export default checkUserExist;
