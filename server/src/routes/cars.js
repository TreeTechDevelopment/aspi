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

app.get('/all-info', getAllInfo)
app.get('/info', getInfoCars)
app.get('/all', getCars)
app.get('/', getCar)

app.post('/', checkProductsExistMiddleware, postNewCar)

app.put('/', checkProductsExistMiddleware, updateCar)

module.exports = app