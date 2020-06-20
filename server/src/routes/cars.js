const express = require('express');
const path = require('path');

const app = express();

const {
    getAllInfo,
    getCars
} = require('../controllers/cars')

app.get('/all', getAllInfo)
app.get('/', getCars)

module.exports = app