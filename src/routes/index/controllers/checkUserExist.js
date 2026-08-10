import dbUtils from "../../../database/utils/index.js";

var checkUserExist = async (req, res, next) => {
  var { userId } = req.body;

  var user = await dbUtils.getUser(userId);

  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }

  next();
};

export default checkUserExist;
