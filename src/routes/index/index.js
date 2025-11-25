var { Router } = require("express");

var router = Router({ caseSensitive: true });

router.post(
  "/",
  require("./controllers/checkAuth"),
  require("./controllers/periodsFilter"),
  require("./controllers/writeReportsToQueue"),
  require("./controllers/reportLoading")
);

router.post("/background-tasks/load-fresh-reports", require("./controllers/checkAuth"), require("./controllers/loadeFreshReports"));

module.exports = router;
