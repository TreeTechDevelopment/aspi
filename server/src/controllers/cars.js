
const Model = require('../db/models/modelos');
const Car = require('../db/models/cars');
const Make = require('../db/models/marcas');

const getAllInfo = async (req, res) => {
    try{
        const models = await Model.find({})
        const makes = await Make.find({})         
        res.json({ models, makes })
    }catch(e){
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
        console.log(newCar)

        const make = await Make.findById(newCar.make)
        const model = await Model.findById(newCar.model)

        newCar.make = make
        newCar.model = model
        newCar._id = Math.random().toString()
        
        res.json({ newCar })
    }catch(e){        
        console.log(e)
        res.sendStatus(500)
    }
}

module.exports = {
    getAllInfo,
    getCar,
    getCars,
    postNewCar
}