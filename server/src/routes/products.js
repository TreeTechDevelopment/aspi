const express = require('express');

const app = express();

const {
    getFilters,
    getSparkplug,
    createProduct,
    updateProduct,
    getBrakeshoe,
    getWireset
} = require('../controllers/products')

const {
    isAuthenticated,
    isAuthenticatedAdmin
} = require('../controllers/client')

app.get('/filter', getFilters)
app.get('/sparkPlug', getSparkplug)
app.get('/wiresets', getWireset)
app.get('/brakeShoe', getBrakeshoe)

app.post('/', createProduct)

app.put('/', updateProduct)

module.exports = app