const express = require('express');

const app = express();

const {
    handleClient,
    isAuthenticated,
    isAuthenticatedAdmin
} = require('../controllers/client')

app.get('/', handleClient)
app.get('/services/service-order', handleClient)
app.get('/services', handleClient)
app.get('/services/sells', handleClient)
app.get('/cross', handleClient)
app.get('/iniciar-sesion', handleClient)
app.get('/records', handleClient)
app.get('/records/cars', handleClient)
app.get('/records/products', handleClient)
app.get('/records/services', handleClient)
app.get('/signup', handleClient)
app.get('/search/orders', handleClient)
app.get('/search', handleClient)
app.get('/search/cars', handleClient)

module.exports = app