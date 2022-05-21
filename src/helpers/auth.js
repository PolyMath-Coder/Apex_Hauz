const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const AppError = require('../helpers/error');
const { header } = require('express/lib/request');
require('dotenv').config();
const secretKey = process.env.JWT_KEY_SECRET;

const authenticateUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secretKey, async (err, decodedToken) => {
      if (err) {
        return res.send({ msg: 'Unauthorized...' });
      }
      //   console.log(decodedToken);
      await User.findByEmail(decodedToken.email, (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res
              .status(400)
              .json({ staus: 'error', error: 'User does not exist.' });
            return;
          }
          res.status(500).json({ status: 'error', message: err.message });
          return;
        }
        if (data) {
          //   console.log(data);
          req.user = data;
          return;
        }
      });
      next();
    });
  } else {
    res.status(400).json({ status: 'error', message: 'not allowed...' });
  }
};

const adminAuthorization = (req, res, next) => {
  if (!req.user || req.user.is_admin !== 1) {
    return res
      .status(400)
      .json({ status: 'error', message: "You're not allowed here..." });
  } else {
    return next();
  }
};

module.exports = { authenticateUser, adminAuthorization };
