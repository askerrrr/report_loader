var express = require("express");
var { runDB } = require("./database/");
var runReportPeriodsWriter = require("./reportPeriods");
var retryFailedReports = require("./retryFailedReports.js");

var app = express();

var TWO_HOURS_MS = 7200000;

(async () => {
  runReportPeriodsWriter();

  setInterval(retryFailedReports, TWO_HOURS_MS);

  await runDB();
  app.locals.db = require("./database/utils");

  app.listen(process.env.PORT, process.env.HOST, console.log("server run..."));
})();

app.use(express.urlencoded());
app.use(express.json());

app.use("/", require("./routes/index"));

app.use(require("./middleware/errorHandler"));
