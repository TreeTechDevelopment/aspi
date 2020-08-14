const express = require('express');

const app = express();

const {
    getFilters,
    getSparkplug,
    createProduct,
    updateProduct,
    getBrakeshoe,
    getWireset,
    getOil,
    deleteProducts,
    getAntifreeze,
    getCoil
} = require('../controllers/products')

const {
    isAuthenticated,
    isAuthenticatedAdmin
} = require('../controllers/client')

app.get('/filter', getFilters)
app.get('/sparkPlug', getSparkplug)
app.get('/wiresets', getWireset)
app.get('/brakeShoe', getBrakeshoe)
app.get('/oil', getOil)
app.get('/antifreeze', getAntifreeze)
app.get('/coil', getCoil)

app.post('/', createProduct)

app.put('/', updateProduct)

app.delete('/', deleteProducts)

module.exports = app