'use strict';

require('dotenv').config();
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser').json(),
    path = require('path'),
    mySql = require('mysql'),
    PORT = process.env.PORT;


const conn = mySql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

conn.connect((err) => {
    if (err) {
        console.log('Error connecting to Db');
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
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});