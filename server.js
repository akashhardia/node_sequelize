const express = require('express');
const app = express();
const db = require('./db/db');

app.get('/', function(req, res) {
    res.send('home');
});

app.listen(process.env.PORT, function(err) {
    if (err)
        throw new Error(err);
    console.log('server started');
});
