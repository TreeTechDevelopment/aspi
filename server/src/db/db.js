const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const fs = require('fs')
const path = require('path')
/* const excelToJson = require('convert-excel-to-json');

const result = excelToJson({
    source: fs.readFileSync(path.resolve( __dirname, '../../../oscar-nuevos.xlsx' )) 
});

const models = JSON.parse(fs.readFileSync(path.join(__dirname, '/modelos.json')) )

const { createCarDB } = require('../services/cars') */

const Make = require('./models/marcas');
const Model = require('./models/modelos');
const Car = require('./models/cars');
const Filter = require('./models/filters');
const App = require('./models/aplication');

const DBconfig = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect( process.env.DB, DBconfig ,async (db) => {
    console.log("DB connected")
    
} )