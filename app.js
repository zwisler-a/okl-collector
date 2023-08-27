const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const collectorRouter = require('./routes/collector');
const configRouter = require('./routes/config.js');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/', configRouter);
app.use('/', collectorRouter);

app.use(express.static('./public'))

module.exports = app;
