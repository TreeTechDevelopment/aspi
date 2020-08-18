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

app.get('/filter', isAuthenticated, getFilters)
app.get('/sparkPlug', isAuthenticated, getSparkplug)
app.get('/wiresets', isAuthenticated, getWireset)
app.get('/brakeShoe', isAuthenticated, getBrakeshoe)
app.get('/oil', isAuthenticated, getOil)
app.get('/antifreeze', isAuthenticated, getAntifreeze)
app.get('/coil', isAuthenticated, getCoil)

app.post('/', isAuthenticatedAdmin, createProduct)

app.put('/', isAuthenticatedAdmin, updateProduct)

app.delete('/', isAuthenticatedAdmin, deleteProducts)

module.exports = app