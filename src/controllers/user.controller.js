const User = require('../models/user.model');
const { generateToken } = require('../helpers/jwt');
const bcrypt = require('bcrypt');
const registerUser = async (req, res) => {
  const {
    id,
    email,
    first_name,
    last_name,
    password,
    phone,
    address,
    is_admin,
  } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User(
    id,
    email,
    first_name,
    last_name,
    hashedPassword,
    phone,
    address,
    is_admin
  );
  User.createUser(user, (err, data) => {
    if (err) {
      res.status(400).json({ error: err.message || 'There has just an error' });
    }
    const token = generateToken(data.email);
    const maxAge = 0.5 * 24 * 60 * 60;
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ status: 'success', data: { token, ...data } });
  });
};

const signInUser = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, async (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          status: 'error',
          message: `User with ${email} does not exist`,
        });
        return;
      }
      res.status(500).json({ status: 'error', message: err.message });
      return;
    }
    if (data) {
      const auth = await bcrypt.compare(password, data.hashedPassword);
      const token = generateToken(data.email);
      const maxAge = 0.5 * 24 * 60 * 60;
      res.cookie('jwt', token, { maxAge: maxAge * 1000 });
      if (auth) {
        return res
          .status(201)
          .json({ status: "you're signed in", data: { token, ...data } });
      }
      res
        .status(400)
        .json({ status: 'error', error: 'Ooops... Incorrect Password!' });
    }
    res.status(400).json({
      status: 'error',
      error:
        'Kindly check your mail and re-enter, else, use the sign up button',
    });
  });
};

module.exports = { registerUser, signInUser };
