const express = require('express');

const app = express();

const clientRoutes = require('./client');
const carsRoutes = require('./cars');
const usersRoutes = require('./users');
const filtersRoutes = require('./filters');
const ordersRoutes = require('./orders');
const servicesRoutes = require('./services');

app.use('/', clientRoutes)
app.use('/cars', carsRoutes)
app.use('/users', usersRoutes)
app.use('/filters', filtersRoutes)
app.use('/orders', ordersRoutes)
app.use('/services', servicesRoutes)

module.exports = app