const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const fs = require('fs')
const path = require('path')
const excelToJson = require('convert-excel-to-json');

const result = excelToJson({
    source: fs.readFileSync(path.resolve( __dirname, '../../../oscar-nuevos.xlsx' )) 
});

const models = JSON.parse(fs.readFileSync(path.join(__dirname, '/modelos.json')) )

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

    //GUARDAR CARROS EN BASE DE DATOS
    for(let i = 0; i < 20; i++){
        let newCar = await createCarDB(result.Hoja1[i].A.split('-'), models)
        //guardar
        //let newcarDB = new Car(newCar)
        //newcarDB.save()
        console.log(newCar)
    }


    //GUARDAR NUEVOS MODELOS EN BASE DE DATOS DESDE EL JSON
    /* for(let i = 0; i < models.length; i++){
        let make = await Make.findOne({ name: models[i].brand })
        for(let j = 0; j < models[i].models.lenghth; j++){
            let newModel = new Model({
                name: models[i].models[j],
                make: make._id
            })
            newModel.save()
        }
    } */

    //GUARDAR NUEVO MODELO DIRECTAMENTE
    /* let make = await Make.findOne({ name: 'BMW' })
    let newModel = new Model({
        name: '330Ci',
        make: make._id
    })

    newModel.save() */

    //borrar con el id
    //await Model.findByIdAndRemove('5ef16f640ebf492de8a46843')

    //await Model.findByIdAndRemove('5ee6c974b79c46273c2a1849')

    console.log('TERMINADO')
    
} )