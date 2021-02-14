const router = require('express').Router();
const { celebrate } = require('celebrate');
const { movieRule, movieIdRule } = require('../rules/movie');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', celebrate(movieRule), createMovie);
router.delete('/:movieId', celebrate(movieIdRule), deleteMovie);

module.exports = router;
