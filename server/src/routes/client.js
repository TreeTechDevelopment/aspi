const express = require('express');

const app = express();

const {
    handleClient,
    isAuthenticated,
    isAuthenticatedAdmin,
    isAuthenticatedStatus
} = require('../controllers/client')

const { logout } = require('../controllers/users')

app.get('/', handleClient)
app.get('/services/service-order',  handleClient)
app.get('/services',  handleClient)
app.get('/services/sells', isAuthenticated, handleClient)
app.get('/cross', isAuthenticated, handleClient)
app.get('/iniciar-sesion', handleClient)
app.get('/records', isAuthenticatedAdmin, handleClient)
app.get('/records/cars', isAuthenticatedAdmin, handleClient)
app.get('/records/products', isAuthenticatedAdmin, handleClient)
app.get('/records/services', isAuthenticatedAdmin, handleClient)
app.get('/signup', isAuthenticatedAdmin, handleClient)
app.get('/search/orders',  handleClient)
app.get('/search',  handleClient)
app.get('/search/cars', isAuthenticated, handleClient)
app.get('/logout', logout)
app.get('/islogged', isAuthenticatedStatus)

module.exports = app