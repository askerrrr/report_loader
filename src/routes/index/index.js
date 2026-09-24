import { Router } from "express";
import checkAuth from "./controllers/checkAuth.js";
import * as joiSchemas from "./joiSchemas/index.schema.js";
import periodsFilter from "./controllers/periodsFilter.js";
import reportLoading from "./controllers/reportLoading.js";
import checkUserExist from "./controllers/checkUserExist.js";
import loadFreshReports from "./controllers/loadFreshReports.js";
import resumeReportLoading from "./controllers/resumeReportLoading.js";
import writeReportsToQueue from "./controllers/writeReportsToQueue.js";
import joiSchemaValidator from "../../middleware/joiSchemaValidator.js";
import resumeAbandonedReportsLoading from "./controllers/resumeAbandonedReportsLoading.js";

var router = Router({ caseSensitive: true });

router.post("/", checkAuth, joiSchemaValidator(joiSchemas.reportLoaderSchema), checkUserExist, periodsFilter, writeReportsToQueue, reportLoading);

router.post("/resume-loading/", checkAuth, checkUserExist, joiSchemaValidator(joiSchemas.resumeReportLoadingSchema), resumeReportLoading);

router.post("/resume-loading/abandoned/", checkAuth, joiSchemaValidator(joiSchemas.resumeReportLoadingSchema), resumeAbandonedReportsLoading);

router.post("/background-tasks/load-fresh-reports", checkAuth, joiSchemaValidator(joiSchemas.loadFreshReportsSchema), loadFreshReports);

export default router;
