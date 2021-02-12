const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/auth-error');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  const { NODE_ENV, TOKEN_SECRET_KEY } = process.env;
  const authError = new AuthorizationError('Для доступа к запрашиваемому ресурсу необходима авторизация');
  if (!token) return next(authError);
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? TOKEN_SECRET_KEY : 'token-secret-key',
    );
  } catch (error) {
    return next(authError);
  }
  req.user = payload;
  return next();
};
