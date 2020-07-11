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

app.get('/all-info', getAllInfo)
app.get('/info', getInfoCars)
app.get('/all', getCars)
app.get('/', getCar)

app.post('/', postNewCar)

app.put('/', updateCar)

module.exports = app