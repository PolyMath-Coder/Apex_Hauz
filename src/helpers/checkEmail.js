const User = require('../models/user.model');

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  User.findByEmail(email, (_, data) => {
    if (data) {
      res.status(400).json({
        status: 'error',
        message: 'Oops! A user with this email already exists...',
      });
      return;
    }
    next();
  });
};

module.exports = { checkEmail };
