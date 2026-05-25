import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().required(),
  nextRequestDelayMs: Joi.number(),
  isPeriodWithinSameWeek: Joi.boolean(),
  needsReportLoadingDelay: Joi.boolean(),
  dateTo: Joi.string().allow("").required(),
  uploadAllReports: Joi.boolean().required(),
  dateFrom: Joi.string().allow("").required(),
});

export default schema;
