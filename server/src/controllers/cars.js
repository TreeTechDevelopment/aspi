
const Model = require('../db/models/modelos');
const Car = require('../db/models/cars');
const Make = require('../db/models/marcas');
const Motor = require('../db/models/motores');

const getAllInfo = async (req, res) => {
    try{
        const models = await Model.find({}).populate('make')
        const makes = await Make.find({})
        const motors = await Motor.find({})
        res.status(200).json({ models, makes, motors })
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

module.exports = {
    getAllInfo
}