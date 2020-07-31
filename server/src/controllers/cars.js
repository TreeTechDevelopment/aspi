
const Model = require('../db/models/modelos');
const Car = require('../db/models/cars');
const Make = require('../db/models/marcas');
const App = require('../db/models/aplication');
const Service = require('../db/models/services');
const Filter = require('../db/models/filters');
const Plug = require('../db/models/plugs');
const Wireset = require('../db/models/wiresets');
const Brakeshoe = require('../db/models/brakeshoe');
const Oil = require('../db/models/oil');

const getAllInfo = async (req, res) => {
    try{
        const { newIDOrder } = req.query

        let app = await App.findOne({})
        const models = await Model.find({})
        const makes = await Make.find({}) 
        const services = await Service.find({})
        const filters = await Filter.find({})
        const sparkplugs = await Plug.find({})
        const wiresets = await Wireset.find({})
        const brakeshoes = await Brakeshoe.find({})
        const oils = await Oil.find({})

        const idOrder = app.idOrder

        if(newIDOrder === "true"){
            if(idOrder + 1 === 10000){ app.idOrder = 1 }
            else{ app.idOrder = idOrder + 1 }
            app.save()
        }
        
        res.json({ models, makes, idOrder, services, filters, sparkplugs, wiresets, brakeshoes, oils})
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const getInfoCars = async (req, res) => {
    try{

        const models = await Model.find({})
        const makes = await Make.find({})
        
        res.json({ models, makes })
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const getCar = async (req, res) => {
    try{
        const { model, make } = req.query

        let query = {}

        if(model){ query.model = model }
        if(make){ query.make = make }

        const cars = await Car.find(query).populate('make').populate('model')

        res.json({ cars })
    }catch(e){
        res.sendStatus(500)
    }
}

const getCars = async (req, res) => {
    try{        
        const cars = await Car.find({ }).populate('make').populate('model')
        res.json({ cars })
    }catch(e){        
        res.sendStatus(500)
    }
}

const postNewCar = async (req, res) => {
    try{        
        const newCar = req.body

        const make = await Make.findById(newCar.make)
        const model = await Model.findById(newCar.model)

        let car = new Car(newCar)
        car.save((err, newCarDB) => {
            if(err){ return res.sendStatus(500) }
            newCarDB.make = make
            newCarDB.model = model
            res.json({ newCar: newCarDB })
        })
        
    }catch(e){        
        console.log(e)
        res.sendStatus(500)
    }
}

const updateCar = async (req, res) => {
    try{        
        const newCar = req.body

        console.log(newCar)

        let car = await Car.findById(newCar.id)

        const make = await Make.findById(newCar.make)
        const model = await Model.findById(newCar.model)

        car.cylinder = newCar.cylinder
        car.motor = newCar.motor
        car.airFilter = newCar.airFilter
        car.oilFilter = newCar.oilFilter
        car.fuelFilter = newCar.fuelFilter
        car.cabineFilter = newCar.cabineFilter
        car.sparkPlug = newCar.sparkPlug
        car.wiresets = newCar.wiresets
        car.brakeShoeFront = newCar.brakeShoeFront
        car.brakeShoeBack = newCar.brakeShoeBack

        car.save((err, newCarDB) => {
            if(err){ return res.sendStatus(500) }
            newCarDB.make = make
            newCarDB.model = model
            res.json({ newCar: newCarDB })
        })
        
    }catch(e){        
        console.log(e)
        res.sendStatus(500)
    }
}

module.exports = {
    getAllInfo,
    getCar,
    getCars,
    postNewCar,
    updateCar,
    getInfoCars
}