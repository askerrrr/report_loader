var express = require("express");
var { runDB } = require("./database/");
var runReportPeriodsWriter = require("./dateUtils");
var resumeInterruptedReportsLoad = require("./routes/index/utils/resumeInterruptedReportsLoad");

var app = express();

(async () => {
  runReportPeriodsWriter();

  await runDB();
  app.locals.db = require("./database/utils");

  app.listen(process.env.PORT, process.env.HOST, console.log("server run..."));
  await resumeInterruptedReportsLoad();
})();

app.use(express.urlencoded());
app.use(express.json());

app.use("/", require("./routes/index"));

app.use(require("./middleware/errorHandler"));
