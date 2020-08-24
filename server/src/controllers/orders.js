const Order = require('../db/models/orders');

const createOrder = async (req, res) => {
    try{
        
        const order = req.body

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
            prevOrder.sparkplug = order.sparkplugs
            prevOrder.note = order.note
            prevOrder.oil = order.oil
            prevOrder.total = order.total
            prevOrder.phone = order.phone
            prevOrder.products = order.products

            prevOrder.save((err, orderDB) => {
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
        orderDB.coil = order.coil
        orderDB.transmission = order.transmission
        orderDB.antifreeze = order.antifreeze
        orderDB.sparkplugs = order.sparkplugs
        orderDB.note = order.note
        orderDB.oil = order.oil
        orderDB.filters = order.filters
        orderDB.total = order.total
        orderDB.brakeshoeBack = order.brakeshoeBack
        orderDB.brakeshoeFront = order.brakeshoeFront
        orderDB.wiresets = order.wiresets
        orderDB.total = order.total
        orderDB.phone = order.phone
        orderDB.sparkPlugsQuantity = order.sparkPlugsQuantity
                
        orderDB.save((err, orerDB) => {
            if(err){ return res.sendStatus(500) }

            res.sendStatus(200)
        })
        

    }catch(e){
        res.sendStatus(500) 
    }
}

const getOrder = async (req, res) => {
    try{
        
        const { id } = req.query

        const order = await Order.findOne({ idOrder: Number(id) }).populate({ path: 'car', populate: { path: 'make' }})

        if(order){ await order.car.populate('model').execPopulate();  }

        res.json({ order })

    }catch(e){
        res.sendStatus(500)
    }
}

module.exports = {
    createOrder,
    getOrder,
    updateOrder
}