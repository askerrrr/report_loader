var Joi = require("joi");

var schema = Joi.object({
  userId: Joi.string().required(),
  dateFrom: Joi.string(),
  dateTo: Joi.string(),
  nextRequestDelayMs: Joi.number(),
  isPeriodWithinSameWeek: Joi.boolean(),
  needsReportLoadingDelay: Joi.boolean(),
  isWeeklyLoadingOfFreshReport: Joi.boolean(),
});

var checkAuth = async (req, res, next) => {
  var authHeader = req.headers?.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  var [type, secretKey] = authHeader.split(" ");

  if (type !== "Bearer" || secretKey !== process.env.SECRET_KEY) {
    return res.sendStatus(401);
  }

  var { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: `Key ${error.details[0].message}` });
  }

  if (req.body.isWeeklyLoadingOfFreshReport) {
    next();
  } else {
    var { getUser } = req.app.locals.db;

    var user = await getUser(req.body.userId);

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    next();
  }
};

module.exports = checkAuth;
