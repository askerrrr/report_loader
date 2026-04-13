import { Router } from "express";
import checkAuth from "./controllers/checkAuth.js";
import periodsFilter from "./controllers/periodsFilter.js";
import reportLoading from "./controllers/reportLoading.js";
import loadFreshReports from "./controllers/loadFreshReports.js";
import writeReportsToQueue from "./controllers/writeReportsToQueue.js";

var router = Router({ caseSensitive: true });

router.post("/", checkAuth, periodsFilter, writeReportsToQueue, reportLoading);

router.post("/background-tasks/load-fresh-reports", loadFreshReports);

export default router;
