const { Router } = require('express');
const { registerUser, signInUser } = require('../controllers/user.controller');
const { checkEmail } = require('../helpers/checkEmail');
const {
  userSignUpValidator,
  userLoginValidator,
} = require('../helpers/validate');

const router = Router();

router.post('/signup', checkEmail, userSignUpValidator, registerUser);

router.post('/signin', userLoginValidator, signInUser);

module.exports = router;
