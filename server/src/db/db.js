const mongoose = require('mongoose');
//const bcrypt = require('bcrypt')

const Make = require('./models/marcas');
const Model = require('./models/modelos');
const Car = require('./models/cars');
const Filter = require('./models/filters');
const App = require('./models/aplication');
const Service = require('./models/services');
const Order = require('./models/orders');
const User = require('./models/users');

/* const fs = require('fs')
const path = require('path')

const excelToJson = require('convert-excel-to-json');

const result = excelToJson({
    source: fs.readFileSync(path.resolve( __dirname, '../../Equivalecias.xlsx' ))
})

const equi = JSON.parse(fs.readFileSync(path.resolve( __dirname, '../../equivalecias.json' ))) 

const { createFilterDB } = require('../services/products')
 */
const DBconfig = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect( process.env.DB_DEMO, DBconfig ,async (err, db) => {
    console.log("DB connected")
    if(err){ console.log(err) }
    //await User.findByIdAndRemove('5ed19226ea93ea108cbea16b')

    //mongoose.connection.db.dropCollection('filters', function(err, result) {});

    /* for(let i = 3; i < equi[0].length; i++){
        let filter = await createFilterDB(equi[0][i])
        let newFilter = new Filter(filter)
        newFilter.save()
    } */

    console.log('TERMINADO')

} )