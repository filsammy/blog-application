module.exports.errorHandler = (err, req, res, next) => {

  console.error(err);

  const errorMessage = err.message || 'Internal Server Error';
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    error: {
      message: errorMessage,
      errorCode: err.code || 'SERVER_ERROR',
      details: err.details || null
    }
  });
};
