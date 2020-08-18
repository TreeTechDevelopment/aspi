const express = require('express');

const app = express();

const {
    getAllServices,
    updateService
} = require('../controllers/services')

const {
    isAuthenticatedAdmin
} = require('../controllers/client')

app.get('/all', isAuthenticatedAdmin, getAllServices)

app.put('/', isAuthenticatedAdmin, updateService)


module.exports = app