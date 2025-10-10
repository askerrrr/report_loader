var env = require("./env");
var express = require("express");
var { runDB } = require("./database/");
var runReportPeriodsWriter = require("./reportPeriods");

var app = express();

(async () => {
  runReportPeriodsWriter();

  await runDB();
  app.locals.db = require("./database/utils");

  app.listen(env.PORT, env.HOST, console.log("server run..."));
})();

app.use(express.urlencoded());
app.use(express.json());

app.use("/", require("./routes/index"));

app.use(require("./middleware/errorHandler"));
