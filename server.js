'use strict';

const express = require('express'),
    app = express(),
    bodyParser = require('body-parser').json(),
    path = require('path'),
    mySql = require('mysql'),
    PORT = process.env.PORT;

require('dotenv').config();

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

app.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});