class CustomError extends Error {
  constructor(message, statusCode = 500, details) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    error: {
      name: err.name,
      message: err.message,
      statusCode: err.statusCode,
      details: err.details || null,
    },
  });
};
const notFoundHandler = (req, res, next) => {
  const notFoundError = new CustomError('Resource Not Found', 404);
  next(notFoundError);
};


export { CustomError, errorHandler, notFoundHandler };
