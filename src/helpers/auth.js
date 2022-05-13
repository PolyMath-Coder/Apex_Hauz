const jwt = require('jsonwebtoken');

const maxAge = 0.5 * 24 * 60 * 60;
const generateToken = (email) =>
  jwt.sign({ email }, 'sidehustle_capstone', {
    expiresIn: maxAge,
  });

module.exports = { generateToken };
