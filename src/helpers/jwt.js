const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_KEY_SECRET;

const maxAge = 0.5 * 24 * 60 * 60;
const generateToken = (email) =>
  jwt.sign({ email }, secretKey, {
    expiresIn: maxAge,
  });

module.exports = { generateToken };
