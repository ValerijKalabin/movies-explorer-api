const router = require('express').Router();
const { celebrate } = require('celebrate');
const { signupRule, signinRule } = require('../rules/auth');
const { signup, signin, signout } = require('../controllers/auth');

router.post('/signup', celebrate(signupRule), signup);
router.post('/signin', celebrate(signinRule), signin);
router.post('/signout', signout);

module.exports = router;
