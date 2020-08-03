const mongoose = require('mongoose');

const Make = require('./models/marcas');
const Model = require('./models/modelos');
const Car = require('./models/cars');
const Filter = require('./models/filters');
const App = require('./models/aplication');
const Service = require('./models/services');
const Order = require('./models/orders');

/* const excelToJson = require('convert-excel-to-json');
const fs = require('fs')
const path = require('path')

const result = excelToJson({
    source: fs.readFileSync(path.resolve( __dirname, '../../../OSCAR-1.xlsx' ))
})

const { createFilterDB } = require('../services/filter')

const filters = JSON.parse(fs.readFileSync(path.resolve( __dirname, '../../../equivalecias.json' ))) */

const DBconfig = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect( process.env.DB, DBconfig ,async (db) => {
    console.log("DB connected")

    //await Model.findByIdAndRemove('5ee6c972b79c46273c2a179c')

} )