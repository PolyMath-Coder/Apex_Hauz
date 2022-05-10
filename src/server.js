const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const db = require('./config/db.config');

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

app.listen(PORT, () => {
  console.log(`Server now listening on port ${PORT}`);
});
