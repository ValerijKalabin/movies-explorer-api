const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RequestError = require('../errors/request-error');
const ConflictError = require('../errors/conflict-error');

module.exports.signup = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      hash,
    }))
    .then(() => res.send({
      message: 'Успешная регистрация',
    }))
    .catch((error) => {
      let currentError = error;
      if (error.name === 'ValidationError') {
        currentError = new RequestError('Укажите корректные данные пользователя');
      }
      if (error.name === 'MongoError') {
        currentError = new ConflictError('Пользователь с такой почтой уже зарегистрирован');
      }
      return next(currentError);
    });
};

module.exports.signin = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, TOKEN_SECRET_KEY } = process.env;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? TOKEN_SECRET_KEY : 'token-secret-key',
        { expiresIn: '7d' },
      );
      return res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
        .status(201).send({
          message: 'Успешная авторизация',
        });
    })
    .catch(next);
};

module.exports.signout = (req, res) => res.cookie('token', '', {
  maxAge: -1,
  httpOnly: true,
  sameSite: true,
})
  .send({
    message: 'Выход из системы',
  });
