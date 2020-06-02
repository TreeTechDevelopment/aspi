const express = require('express');
const path = require('path');

const app = express();

const clientRoutes = require('./client');
const carsRoutes = require('./cars');
const usersRoutes = require('./users');

app.use('/', clientRoutes)
app.use('/cars', carsRoutes)
app.use('/users', usersRoutes)

module.exports = app