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

mongoose.connect( process.env.DB, DBconfig ,async (err, db) => {
    console.log("DB connected")
    if(err){ console.log(err) }
    //await Service.findByIdAndRemove('5f48606e9b8573118079e714')

    //mongoose.connection.db.dropCollection('filters', function(err, result) {});

    /* let services = [{ name: 'changeAirFilter', label: 'CAMBIO DE FILTRO DE AIRE', price: 100 },{ name: 'changeOilFilter', label: 'CAMBIO DE FILTRO DE ACEITE', price: 100 },
                    { name: 'cleanAB', label: 'LIMPIEZA DE CUERPO DE ACELERACIÓN', price: 100 }, { name: 'cleanInj', label: 'LIMPIEZA DE INYECTORES', price: 100 }]

    for(let i = 0; i < services.length; i++){
        let newFilter = new Service(services[i])
        newFilter.save()
    } */

    /* let newApp = new App({ idOrder: 1 })
    newApp.save() */

    //console.log('TERMINADO')

} )