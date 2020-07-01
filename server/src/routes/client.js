const express = require('express');

const app = express();

const {
    handleClient
} = require('../controllers/client')

app.get('/', handleClient)
app.get('/service-order', handleClient)
app.get('/cross', handleClient)
app.get('/iniciar-sesion', handleClient)
app.get('/records', handleClient)
app.get('/records/cars', handleClient)
app.get('/records/*', handleClient)


module.exports = app