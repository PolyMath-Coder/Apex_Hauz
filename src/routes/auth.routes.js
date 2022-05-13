const { Router } = require('express');
const { createUser } = require('../controllers/user.controller');
const { checkEmail } = require('../helpers/checkEmail');
const { userSignUpValidator } = require('../helpers/validate');

const router = Router();

router.post('/signup', checkEmail, userSignUpValidator, createUser);

router.get('/signin', (req, res) => {
  res.json({ msg: 'this is the sign in route' });
});

module.exports = router;
