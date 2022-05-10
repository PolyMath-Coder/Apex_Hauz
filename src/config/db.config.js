const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'apexhauz_project',
});

db.connect(function(err) {
  if (err) {
    throw err;
  }
  console.log('Database now Connected...');
});

module.exports = db;
