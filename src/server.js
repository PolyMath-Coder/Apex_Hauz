const express = require('express');
// const { json, urlencoded } = require('express');
const mysql = require('mysql');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const db = require('./config/db.config');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', require('./routes/route'));

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the Home Page...' });
});

// app.get('/createdb', (req, res) => {
//   let sql = 'CREATE DATABASE apexhauz_project';
//   db.query(sql, (err, result) => {
//     if (err) {
//       throw err;
//     }
//     res.send('Database created...');
//     console.log('Now resolved...');
//   });
// });

app.get('/createtable', (req, res) => {
  let sql =
    'CREATE TABLE admin(id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(100) NOT NULL, first_name VARCHAR(100)NOT NULL, last_name VARCHAR(100) NOT NULL, hashedPassword TEXT NOT NULL, phone TEXT NOT NULL, address TEXT NOT NULL, is_admin BOOLEAN DEFAULT FALSE)';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.json('table now created');
  });
});

app.listen(PORT, () => {
  console.log(`Server now listening on port ${PORT}`);
});
