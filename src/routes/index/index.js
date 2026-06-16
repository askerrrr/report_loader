import { Router } from "express";
import checkAuth from "./controllers/checkAuth.js";
import requestBodySchema from "./requestBodySchema.js";
import periodsFilter from "./controllers/periodsFilter.js";
import reportLoading from "./controllers/reportLoading.js";
import loadFreshReports from "./controllers/loadFreshReports.js";
import resumeReportLoading from "./controllers/resumeReportLoading.js";
import writeReportsToQueue from "./controllers/writeReportsToQueue.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";
import resumeAbandonedReportsLoading from "./controllers/resumeAbandonedReportsLoading.js";

var router = Router({ caseSensitive: true });

router.post("/", joiSchemaValidator(requestBodySchema), checkAuth, periodsFilter, writeReportsToQueue, reportLoading);

router.post("/resume-loading/", resumeReportLoading);

router.post("/resume-loading/abandoned/", resumeAbandonedReportsLoading);

router.post("/background-tasks/load-fresh-reports", loadFreshReports);

export default router;
