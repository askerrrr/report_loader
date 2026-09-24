import Joi from "joi";

var schema = Joi.object({
  userId: Joi.string().uuid().required(),
  dateFrom: Joi.string().allow("").required(),
  dateTo: Joi.string().allow("").required(),
  needToLoadAllReports: Joi.boolean().required(),
});

export default schema;
