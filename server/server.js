if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: __dirname + '/.env'});
}

require('./src/db/db')

const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') { app.use(require('cors')()) }
app.use(express.static(path.resolve( __dirname, 'src/public' )))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('./src/routes/routes'))


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})