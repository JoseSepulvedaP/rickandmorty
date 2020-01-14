const express = require('express');
const app = express();

app.use(require('./authentication'));
app.use(require('./character'));

module.exports = app;