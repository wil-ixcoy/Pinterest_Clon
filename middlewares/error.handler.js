const {ValidationError} = require("sequelize");
function logErrors(error, req, res, next) {
  console.log(error);
  next(error);
}

function errorHandler(error, req, res, next) {
  res.status(500).json({
    error: {
      message: error.message,
    },
    stack: error.stack,
  });
  next(error);
}

function boomErrorHandler(error, req, res, next) {
  if (error.isBoom) {
    const output = error;
    res.status(output.output.statusCode).json({
      error: {
        message: output.message,
        statusCode: output.output.statusCode,
        stack: output.stack,
      },
    });
  }
  next(error);
}
function ormErrorHandler(err, req, res, next) {
  if(err instanceof ValidationError) {
    res.status(409).json({
      message: err.errors[0].message,
    });
  }
  next(err);
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
};
