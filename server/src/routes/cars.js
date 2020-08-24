const express = require('express');
const path = require('path');

const app = express();

const {
    getAllInfo,
    getCar,
    getCars,
    postNewCar,
    updateCar,
    getInfoCars
} = require('../controllers/cars')

const { checkProductsExistMiddleware } = require('../services/products')

const { isAuthenticated, isAuthenticatedAdmin } = require('../controllers/client')

app.get('/all-info',  getAllInfo)
app.get('/info',  getInfoCars)
app.get('/all',  getCars)
app.get('/',  getCar)

app.post('/', isAuthenticatedAdmin, checkProductsExistMiddleware, postNewCar)

app.put('/', isAuthenticatedAdmin, checkProductsExistMiddleware, updateCar)

module.exports = app