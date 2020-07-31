const express = require('express');

const app = express();

const clientRoutes = require('./client');
const carsRoutes = require('./cars');
const usersRoutes = require('./users');
const productsRoutes = require('./products');
const ordersRoutes = require('./orders');
const servicesRoutes = require('./services');

app.use('/', clientRoutes)
app.use('/cars', carsRoutes)
app.use('/users', usersRoutes)
app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)
app.use('/services', servicesRoutes)

module.exports = app