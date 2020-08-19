const mongoose = require('mongoose');

const Make = require('./models/marcas');
const Model = require('./models/modelos');
const Car = require('./models/cars');
const Filter = require('./models/filters');
const App = require('./models/aplication');
const Service = require('./models/services');
const Order = require('./models/orders');
const User = require('./models/users');

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

    //await User.findByIdAndRemove('5f3c6796ae0c0c35b8e799a4')

    //mongoose.connection.db.dropCollection('orders', function(err, result) {});

} )