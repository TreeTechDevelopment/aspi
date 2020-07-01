const express = require('express');
const passport = require('passport');

const app = express();

const {
    login,
    logout,
    isAuthenticated
} = require('../controllers/users')

app.get('/logout', logout)
app.get('/authorization' , isAuthenticated)

app.post('/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/iniciar-sesion'
})/* , (req, res) => {    
    console.log(req.user)
    res.json({})
} */)

module.exports = app