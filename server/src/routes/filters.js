const express = require('express');

const app = express();

const {
    getFilters,
    createFilter,
    updateFilter,
    getTotal
} = require('../controllers/filters')

const {
    isAuthenticated,
    isAuthenticatedAdmin
} = require('../controllers/client')

app.get('/', isAuthenticated, getFilters)
app.get('/total', getTotal)

app.post('/', isAuthenticatedAdmin, createFilter)

app.put('/', isAuthenticatedAdmin, updateFilter)

module.exports = app