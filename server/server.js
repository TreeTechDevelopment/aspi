if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: __dirname + '/.env'});
}

require('./src/db/db')
require('./src/services/passport')

const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') { app.use(cors({credentials: true, origin: 'http://localhost:3000'})) }
app.use(express.static(path.resolve( __dirname, 'src/public' )))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(process.env.SESSION_SECRET_KEY))
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,    
    saveUninitialized: false,
    resave: false,
    cookie:{httpOnly:true/*, secure: true*/},
    // PRODUCTION cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    res.header("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
    next();
});

//PRODUCTION app.set('trust proxy', 1)

app.use(require('./src/routes/routes'))


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})