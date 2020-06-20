const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const fs = require('fs')
const path = require('path')
const excelToJson = require('convert-excel-to-json');

const result = excelToJson({
    source: fs.readFileSync(path.resolve( __dirname, '../../../OSCAR.xlsx' )) 
});

const models = JSON.parse( fs.readFileSync(path.join(__dirname, '/modelos.json')) )

const { createCarDB } = require('../services/cars')

const Make = require('./models/marcas');
const Model = require('./models/modelos');
const Car = require('./models/cars');

const DBconfig = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

mongoose.connect( process.env.DB, DBconfig ,async (db) => {
    console.log("DB connected")
    
   /*  for(let i = 3708; i < 3710; i++){
        let newCar = await createCarDB(result.sheet1[i].C.split('-'), models)
        let newcarDB = new Car(newCar)
        newcarDB.save()
        console.log(newCar)
    }

    //await Model.findByIdAndRemove('5ee6c974b79c46273c2a1849')

    console.log('TERMINADO') */
    
} )