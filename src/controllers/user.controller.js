const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const createUser = async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: 'Content cannot be empty!',
    });
  }
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
      res.json({ err: 'There has just been an error!' });
    }
    res.status(200).json({ msg: data });
  });
};

module.exports = { createUser };
