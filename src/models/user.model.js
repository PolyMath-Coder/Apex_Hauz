const db = require('../config/db.config');
const bcrypt = require('bcrypt');

class User {
  constructor(
    id,
    email,
    first_name,
    last_name,
    password,
    phone,
    address,
    is_admin
  ) {
    this.id = id;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.hashedPassword = password;
    this.phone = phone;
    this.address = address;
    this.is_admin = is_admin;
  }
  static createUser(newUser, result) {
    db.query(
      `INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newUser.id,
        newUser.email,
        newUser.first_name,
        newUser.last_name,
        newUser.hashedPassword,
        newUser.phone,
        newUser.address,
        newUser.is_admin,
      ],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, null);
        }
        console.log('Created User:', { ...newUser });
        result(null, { id: res.insertId, ...newUser });
      }
    );
  }
}
module.exports = User;
