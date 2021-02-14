const { Joi } = require('celebrate');
const { default: validator } = require('validator');

const validatorURL = (value, error) => {
  if (validator.isURL(value)) {
    return value;
  }
  return error.message('Укажиже корректный адрес ссылки');
};

module.exports.movieRule = {
  body: Joi.object().keys({
    movieId: Joi.number().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().required().custom(validatorURL),
    thumbnail: Joi.string().required().custom(validatorURL),
    trailer: Joi.string().required().custom(validatorURL),
  }).unknown(true),
};

module.exports.movieIdRule = {
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
};
