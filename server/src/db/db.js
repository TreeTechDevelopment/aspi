const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const fs = require('fs')
const path = require('path')
const excelToJson = require('convert-excel-to-json');

const result = excelToJson({
    source: fs.readFileSync(path.resolve( __dirname, '../../../OSCAR.xlsx' )) 
});

const { createCarDB } = require('../services/cars')

const Car = require('../db/models/cars');

const DBconfig = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect( process.env.DB, DBconfig ,async (db) => {
    console.log("DB connected")
    /* let car = result.sheet1[2181].C.split('-').map(element => (
        element.replace(/^\s+/g, '').replace(/\s+$/g, '')
    )); */
    //await createCarDB(car)
    //await Car.findByIdAndRemove('5ed5aedb18bca12da0e05633')
} )