import loader from "../utils/loader.js";

var resumeAbandonedReportsLoading = async (req, res) => {
  res.sendStatus(202);

  var { userId } = req.body;

  loader(userId);
};

export default resumeAbandonedReportsLoading;
