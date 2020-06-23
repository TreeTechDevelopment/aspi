
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
        const cars = await Car.find({ make, model })
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

module.exports = {
    getAllInfo,
    getCar,
    getCars
}