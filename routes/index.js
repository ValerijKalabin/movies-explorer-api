const router = require('express').Router();
const { celebrate } = require('celebrate');
const { signupRule, signinRule } = require('../rules/auth');
const { movieRule, movieIdRule } = require('../rules/movie');
const { userRule } = require('../rules/user');
const { signup, signin, signout } = require('../controllers/auth');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { getUser, updateUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', celebrate(signupRule), signup);
router.post('/signin', celebrate(signinRule), signin);
router.use(auth);
router.get('/users/me', getUser);
router.patch('/users/me', celebrate(userRule), updateUser);
router.get('/movies', getMovies);
router.post('/movies', celebrate(movieRule), createMovie);
router.delete('/movies/:movieId', celebrate(movieIdRule), deleteMovie);
router.post('/signout', signout);

module.exports = router;
