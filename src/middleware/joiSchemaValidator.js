var joiSchemaValidator = (schema) => (req, res, next) => {
  if (!req.body) {
    return res.sendStatus(400);
  }

  var { error } = schema.validate(req.body);

  if (error) {
    return res.sendStatus(400);
  }

  next();
};

export default joiSchemaValidator;
