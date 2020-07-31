const express = require('express');
const passport = require('passport');

const app = express();

const {
    login,
    logout    
} = require('../controllers/users')

const {
    handleClient,
    isAuthenticated,
    isAuthenticatedAdmin
} = require('../controllers/client')

app.get('/logout', logout)

app.post('/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion'
}))

app.post('/signup', isAuthenticatedAdmin, passport.authenticate('signup',{
    successRedirect: '/',
    failureRedirect: '/signup'
}))

module.exports = app