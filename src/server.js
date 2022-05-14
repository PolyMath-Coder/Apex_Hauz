const express = require('express');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const PORT = process.env.PORT;
const db = require('./config/db.config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

// app.get('/createtable', (req, res) => {
//   let sql =
//     'CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(100) NOT NULL, first_name VARCHAR(100)NOT NULL, last_name VARCHAR(100) NOT NULL, hashedPassword TEXT NOT NULL, phone TEXT NOT NULL, address TEXT NOT NULL, is_admin BOOLEAN DEFAULT FALSE)';
//   db.query(sql, (err, result) => {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//     res.json('table now created');
//   });
// });
// app.get('/createtable', (req, res) => {
//   let sql =
//     'CREATE TABLE property(property_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, status VARCHAR(100) NOT NULL, last_name VARCHAR(100) NOT NULL, state TEXT NOT NULL, city TEXT NOT NULL, address TEXT NOT NULL, type TEXT NOT NULL, image_url TEXT NOT NULL, created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP)';
//   db.query(sql, (err, result) => {
//     if (err) {
//       throw err;
//     }
//     console.log(result);
//     res.json('table now created');
//   });
// });

app.listen(PORT, () => {
  console.log(`Server now listening on port ${PORT}`);
});
