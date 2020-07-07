const express = require('express');

const app = express();

const {
    getFilters,
    createFilter,
    updateFilter,
    getTotal
} = require('../controllers/products')

const {
    isAuthenticated,
    isAuthenticatedAdmin
} = require('../controllers/client')

app.get('/filter', getFilters)
app.get('/total', getTotal)

app.post('/', createFilter)

app.put('/', updateFilter)

module.exports = app