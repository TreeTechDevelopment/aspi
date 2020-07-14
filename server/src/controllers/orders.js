const Order = require('../db/models/orders');
const Service = require('../db/models/services');
const Plug = require('../db/models/plugs');
const Wireset = require('../db/models/wiresets');
const Brakeshoe = require('../db/models/brakeshoe');
const Filter = require('../db/models/filters');

const createOrder = async (req, res) => {
    try{
        
        const order = req.body

        console.log(order)

        let prevOrder = await Order.findOne({ 'idOrder': order.idOrder })

        if(prevOrder){
            prevOrder.car = order.car
            prevOrder.carYear = order.carYear
            prevOrder.cleanAB = order.cleanAB
            prevOrder.cleanInj = order.cleanInj
            prevOrder.brakeshoeBack = order.brakeshoeBack
            prevOrder.brakeshoeFront = order.brakeshoeFront
            prevOrder.wiresets = order.wiresets
            prevOrder.coil = order.coil
            prevOrder.transmission = order.transmission
            prevOrder.antifreeze = order.antifreeze
            prevOrder.sparkplugs = order.sparkplugs
            prevOrder.note = order.note
            prevOrder.oil = order.oil
            prevOrder.filters = order.filters
            prevOrder.total = order.total

            prevOrder.save((err, orderDB) => {
                console.log(err)
                if(err){ return res.sendStatus(500) }

                res.sendStatus(200)
            })
        }else{
            let newOrder = new Order(order)
            newOrder.save((err, orderDB) => {
                console.log(err)
                if(err){ return res.sendStatus(500) }

                res.sendStatus(200)
            })
        }
        
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const updateOrder = async (req, res) => {
    try{
        
        const order = req.body

        let orderDB = await Order.findById(order.id)

        orderDB.cleanAB = order.cleanAB
        orderDB.cleanInj = order.cleanInj
        orderDB.brakeshoe = order.brakeshoe
        orderDB.coil = order.coil
        orderDB.transmission = order.transmission
        orderDB.antifreeze = order.antifreeze
        orderDB.plugs = order.plugs
        orderDB.note = order.note
        orderDB.oil = order.oil
        orderDB.filters = order.filters
        orderDB.total = order.total
                
        orderDB.save((err, orerDB) => {
            console.log(err)
            if(err){ return res.sendStatus(500) }

            res.sendStatus(200)
        })
        

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const getOrder = async (req, res) => {
    try{
        
        const { id } = req.query

        const order = await Order.findOne({ idOrder: Number(id) }).populate({ path: 'car', populate: { path: 'make' }})
        let services = []
        let sparkplugs = []
        let wiresets = []
        let brakeshoes = []
        let filters = []

        if(order){ 
            await order.car.populate('model').execPopulate(); 
            services = await Service.find({})
            sparkplugs = await Plug.find({})
            wiresets = await Wireset.find({})
            brakeshoes = await Brakeshoe.find({})
            filters = await Filter.find({})
        }

        res.json({ order, services, sparkplugs, wiresets, brakeshoes, filters })

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

module.exports = {
    createOrder,
    getOrder,
    updateOrder
}