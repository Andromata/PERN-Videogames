require("dotenv").config();
require('./db.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index')
const errorHandler = require('../utils/middlewares/errorHandlers')
const setHeaders = require('../utils/middlewares/setHeaders')

const server = express();
server.name = 'API';

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

server.use('/', routes);

server.use(setHeaders);
server.use(errorHandler); 
module.exports = server;
