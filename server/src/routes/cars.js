const express = require('express');
const path = require('path');

const app = express();

const {
    getAllInfo,
    getCar,
    getCars
} = require('../controllers/cars')

app.get('/info', getAllInfo)
app.get('/all', getCars)
app.get('/', getCar)

module.exports = app