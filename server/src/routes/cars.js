const express = require('express');
const path = require('path');

const app = express();

const {
    getAllInfo
} = require('../controllers/cars')

app.get('/', getAllInfo)

module.exports = app