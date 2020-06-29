const express = require('express');
const path = require('path');

const app = express();

const {
    getAllInfo,
    getCar,
    getCars,
    postNewCar,
    updateCar
} = require('../controllers/cars')

app.get('/info', getAllInfo)
app.get('/all', getCars)
app.get('/', getCar)

app.post('/', postNewCar)

app.put('/', updateCar)

module.exports = app