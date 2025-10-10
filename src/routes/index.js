var { Router } = require("express");

var router = Router({ caseSensitive: true });

router.post(
  "/",
  require("./controllers/checkAuth"),
  require("./controllers/periodsFilter"),
  require("./controllers/writeReportsToQueue"),
  require("./controllers/loader")
);

module.exports = router;
