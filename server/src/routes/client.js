const express = require('express');
const path = require('path');

const app = express();

const {
    handleClient
} = require('../controllers/client')

app.get('/', handleClient)
app.get('/service-order', handleClient)
app.get('/cross', handleClient)
app.get('/iniciar-sesion', handleClient)

module.exports = app