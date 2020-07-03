const Order = require('../db/models/orders');
const Service = require('../db/models/services');

const createOrder = (req, res) => {
    try{
        
        const order = req.body
        
        let newOrder = new Order(order)
        newOrder.save((err, orerDB) => {
            console.log(err)
            if(err){ return res.sendStatus(500) }

            res.sendStatus(200)
        })

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

        if(order){ 
            await order.car.populate('model').execPopulate(); 
            services = await Service.find({})
        }

        res.json({ order, services })

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