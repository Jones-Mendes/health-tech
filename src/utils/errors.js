const { failure } = require("./response");

class HttpError extends Error {
  constructor(status, message, details = null) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

function notFoundHandler(req, res) {
  return failure(res, 404, "rota nao encontrada");
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpError) {
    return failure(res, err.status, err.message, err.details);
  }

  return failure(res, 500, "erro interno do servidor");
}

module.exports = {
  HttpError,
  notFoundHandler,
  errorHandler,
};
