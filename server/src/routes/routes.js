const express = require('express');

const app = express();

const clientRoutes = require('./client');
const carsRoutes = require('./cars');
const usersRoutes = require('./users');
const filtersRoutes = require('./filters');

app.use('/', clientRoutes)
app.use('/cars', carsRoutes)
app.use('/users', usersRoutes)
app.use('/filters', filtersRoutes)

module.exports = app