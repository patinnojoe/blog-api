const errorMiddleware = (error, req, res, next) => {
  const statusCode = res.code ? res.code : 500;
  res.status(statusCode).json({
    status: false,
    message: error.message,
    stack: error.stack,
    code: statusCode,
  });
};

module.exports = errorMiddleware;
