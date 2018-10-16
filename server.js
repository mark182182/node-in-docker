'use strict';

require('dotenv').config();
const express = require('express'),
app = express(),
bodyParser = require('body-parser').json(),
path = require('path'),
mySql = require('mysql2'),
PORT = process.env.PORT;

const conn = mySql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  database : process.env.EBS_DATABASE,
  port     : process.env.RDS_PORT
});

console.log(process.env.RDS_HOSTNAME, process.env.RDS_USERNAME, process.env.RDS_PASSWORD, process.env.RDS_DB_NAME, process.env.EBS_DATABASE, process.env.RDS_PORT);

conn.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Connection to Db established`);
});

app.use(bodyParser, express.static('assets'));

app.get('/', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.get('/books', function (req, res) {
  conn.query('SELECT * FROM books', (err, books) => {
    if (err) {
      console.log('Database error.');
      return;
    }
    res.status(200).json(books);
  });
});

app.post('/add', function (req, res) {
  const title = req.body.title,
  author = req.body.author;
  console.log(title, author);


  conn.query('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], (err) => {
    if (err) {
      console.log('Database error.');
      return;
    }
    else {
      console.log(`Inserted ${title}`);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
