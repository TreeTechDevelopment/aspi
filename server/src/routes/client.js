const express = require('express');

const app = express();

const {
    handleClient,
    isAuthenticated,
    isAuthenticatedAdmin
} = require('../controllers/client')

app.get('/', handleClient)
app.get('/service-order', isAuthenticated, handleClient)
app.get('/cross', isAuthenticated, handleClient)
app.get('/iniciar-sesion', handleClient)
app.get('/records', handleClient)
app.get('/records/cars', isAuthenticatedAdmin, handleClient)
app.get('/records/products', handleClient)
app.get('/records/services', isAuthenticatedAdmin, handleClient)
app.get('/signup', isAuthenticatedAdmin, handleClient)
app.get('/orders', isAuthenticated, handleClient)

module.exports = app