import express from "express";
import { runDB } from "./database/index.js";
import router from "./routes/index/index.js";
import { serverEmitter } from "./customEvent/index.js";
import errorHandler from "./middleware/errorHandler.js";
import runReportPeriodsWriter from "./dateUtils/index.js";
import resumeInterruptedReportsLoad from "./routes/index/utils/resumeInterruptedReportsLoad.js";

var server;

(async () => {
  runReportPeriodsWriter();

  await runDB();
})();

serverEmitter.on("start", async () => {
  if (!server) {
    server = express();

    server.use(express.urlencoded());
    server.use(express.json());

    server.use("/", router);

    server.use(errorHandler);

    server = server.listen(process.env.PORT, process.env.HOST, console.log("---------- SERVER RUN ----------"));

    resumeInterruptedReportsLoad();
  }
});

serverEmitter.on("close", () => {
  if (server && server?.close) {
    server.close(() => {
      server.removeAllListeners();
      server = null;
    });
  }
});
