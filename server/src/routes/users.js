const express = require('express');

const app = express();

const {
    login
} = require('../controllers/users')

app.post('/', login)

module.exports = app