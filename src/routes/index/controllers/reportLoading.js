var loadingReports = async (req, res, next) => {
  var { userId } = req.body;
  var { token } = await db.getToken(userId);

  await loader(userId, token);
};

module.exports = loadingReports;
