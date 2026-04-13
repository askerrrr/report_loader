var errorHandler = async (e, req, res, next) => {
  console.error({ AppError: e });
  res.sendStatus(500);
};

export default errorHandler;
