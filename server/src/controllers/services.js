const Service = require('../db/models/services');

const getAllServices = async (req, res) => {
    try{

        const services = await Service.find({})

        res.json({ services })
        
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const updateService = async (req, res) => {
    try{

        const { price, id } = req.body

        const service = await Service.findById(id)

        service.price = price

        service.save((err, serviceDB) => {
            if(err){ return res.sendStatus(500) }
            res.json({ service: serviceDB })
        })
        
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

module.exports = {
    getAllServices,
    updateService
}