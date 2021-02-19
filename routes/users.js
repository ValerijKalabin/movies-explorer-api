const router = require('express').Router();
const { celebrate } = require('celebrate');
const { userRule } = require('../rules/user');
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', celebrate(userRule), updateUser);

module.exports = router;
