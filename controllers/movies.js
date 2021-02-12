const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const RequestError = require('../errors/request-error');
const AccessDeniedError = require('../errors/access-denied-error');

module.exports.createMovie = (req, res, next) => {
  const {
    _id,
    country,
    director,
    duration,
    year,
    description,
    image,
    thumbnail,
    trailer,
    nameRU,
    nameEN,
  } = req.body;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    thumbnail,
    trailer,
    nameRU,
    nameEN,
    owner: req.user._id,
    movieId: _id,
  })
    .then((movie) => res.send(movie))
    .catch((error) => next(error.name === 'ValidationError'
      ? new RequestError('Укажите корректные данные фильма')
      : error));
};

module.exports.getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => res.status(200).send(movies))
  .catch(() => next(new NotFoundError('Фильмы не найдены')));

module.exports.deleteMovie = (req, res, next) => Movie.findById(req.params.deleteMovieId)
  .orFail()
  .then((movie) => {
    if (String(movie.owner) !== String(req.user._id)) {
      throw new AccessDeniedError('Вы не можете удалить этот фильм');
    }
    return Movie.findByIdAndRemove(movie._id).then(() => res.status(200).send(movie));
  })
  .catch((error) => next(error.statusCode
    ? error
    : new NotFoundError('Фильм не найден')));
