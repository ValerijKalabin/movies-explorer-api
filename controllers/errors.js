const NotFoundError = require('../errors/not-found-error');

module.exports.pageNotFound = (req, res, next) => {
  const error = new NotFoundError('Запрашиваемый ресурс не найден');
  return next(error);
};

module.exports.handleErrors = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  return next();
};
