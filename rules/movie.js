const { Joi } = require('celebrate');

module.exports.movieRule = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
    trailer: Joi.string().required().uri(),
  }).unknown(true),
};

module.exports.movieIdRule = {
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24),
  }),
};
