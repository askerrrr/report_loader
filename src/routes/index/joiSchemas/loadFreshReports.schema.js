import Joi from "joi";

var schema = Joi.object({ isWeeklyLoadingOfFreshReport: Joi.boolean().valid(true).required() });
export default schema;
