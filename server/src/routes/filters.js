const express = require('express');
const path = require('path');

const app = express();

const {
    getFilters,
    createFilter,
    updateFilter
} = require('../controllers/filters')

app.get('/', getFilters)

app.post('/', createFilter)

app.put('/', updateFilter)

module.exports = app