const express = require('express');

const app = express();

const {
    getAllServices,
    updateService
} = require('../controllers/services')

const {
    isAuthenticated,
    isAuthenticatedAdmin
} = require('../controllers/client')

app.get('/all', getAllServices)

app.put('/', updateService)


module.exports = app