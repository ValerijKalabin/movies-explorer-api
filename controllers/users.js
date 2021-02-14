const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const RequestError = require('../errors/request-error');

module.exports.getUser = (req, res, next) => User.findById(req.user._id)
  .orFail()
  .then((user) => res.send(user))
  .catch(() => next(new NotFoundError('Пользователь не найден')));

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => next(error.name === 'ValidationError'
      ? new RequestError('Укажите корректные данные пользователя')
      : error));
};
