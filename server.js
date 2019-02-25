const express = require('express');
const app = express();
const {
    employeeRouter,
    projectRouter
} = require('./routes/index');

app.use('/projects', projectRouter);
app.use('/employees', employeeRouter);

app.get('/', function(req, res) {
    res.send('home');
});

app.listen(process.env.PORT, function(err) {
    if (err)
        throw new Error(err);
    console.log('server started');
});
