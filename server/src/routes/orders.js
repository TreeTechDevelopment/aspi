const express = require('express');

const app = express();

const {
    createOrder,
    getOrder,
    updateOrder
} = require('../controllers/orders')

const { isAuthenticated } = require('../controllers/client')

app.get('/find', isAuthenticated, getOrder)

app.post('/', isAuthenticated, createOrder)

app.put('/', isAuthenticated, updateOrder)

module.exports = app