import express from "express";
import { runDB } from "./database/index.js";
import router from "./routes/index/index.js";
import errorHandler from "./middleware/errorHandler.js";
import runReportPeriodsWriter from "./dateUtils/index.js";
import resumeInterruptedReportsLoad from "./routes/index/utils/resumeInterruptedReportsLoad.js";

var app = express();

(async () => {
  runReportPeriodsWriter();

  await runDB();

  app.listen(process.env.PORT, process.env.HOST, console.log("server run..."));
  await resumeInterruptedReportsLoad();
})();

app.use(express.urlencoded());
app.use(express.json());

app.use("/", router);

app.use(errorHandler);
