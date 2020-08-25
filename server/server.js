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
const helmet = require("helmet");

const app = express()

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') { 
    const cors = require('cors')
    app.use(cors({credentials: true, origin: 'http://localhost:3000'})) 
}
app.use(express.static(path.resolve( __dirname, 'src/public' )))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(process.env.SESSION_SECRET_KEY))
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,    
    saveUninitialized: false,
    resave: false,    
    //cookie: { secure: true }
}))
app.use(passport.initialize())
app.use(passport.session())
//app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
//app.use(helmet.contentSecurityPolicy());
app.use(helmet.ieNoOpen());
app.use(helmet.frameguard());

app.set('trust proxy', 1)

app.use(require('./src/routes/routes'))


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})