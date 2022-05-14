const { check, validationResult } = require('express-validator');

exports.userSignUpValidator = [
  check('email')
    .isEmail()
    .withMessage('Kindly input a valid email.'),
  check('first_name')
    .trim()
    .isString()
    .withMessage('Has to be a string.')
    .isLength({ min: 3 })
    .withMessage('Minimum of four characters required.'),
  check('last_name')
    .trim()
    .isString()
    .withMessage('Has to be a string.')
    .isLength({ min: 3 })
    .withMessage('Minimum of four characters required.'),
  check('password')
    .isLength({ min: 5 })
    .withMessage('Minimum of five characters required.'),
  check('phone')
    .isLength({ min: 11 })
    .isString()
    .withMessage('Minimum of eleven characters required.'),
  check('address')
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage('Minimum of three characters required.'),
  check('is_admin')
    .trim()
    .isString()
    .withMessage('Input has to be either true or false'),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(400).send({
        error: error.array().map((item) => `${item.param} Error - ${item.msg}`),
      });
    next();
  },
];

exports.userLoginValidator = [
  check('email')
    .isEmail()
    .withMessage('Kindly input a valid email.'),
  check('password')
    .isLength({ min: 5 })
    .withMessage('Minimum of five characters required.'),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty())
      return res.status(400).send({
        error: error.array().map((item) => `${item.param} Error - ${item.msg}`),
      });
    next();
  },
];
