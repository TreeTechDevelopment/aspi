const express = require('express');

const app = express();

const {
    createOrder,
    getOrder,
    updateOrder
} = require('../controllers/orders')

const { isAuthenticated } = require('../controllers/client')

app.get('/find', getOrder)

app.post('/', createOrder)

app.put('/', updateOrder)

module.exports = app