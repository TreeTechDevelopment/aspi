const Filter = require('../db/models/filters')
const Plug = require('../db/models/plugs')
const Wireset = require('../db/models/wiresets')
const Brakeshoe = require('../db/models/brakeshoe')
const Oil = require('../db/models/oil')

const getFilters = async (req, res) => {
    try{
        const { type, filter } = req.query
                
        if(type){            
            const filters = await Filter.find({ filterType: type })

            return res.json({ products: filters })
        }        

        let filters = await Filter.find({ $or: [
            { 'interfil': { $regex : new RegExp(filter, "i") } },
            { 'OEM': { $in: [new RegExp(filter, "i")] } },
            { 'ACD': { $in: [new RegExp(filter, "i")] } },
            { 'Fram': { $in: [new RegExp(filter, "i")] } },
            { 'Gonher': { $in: [new RegExp(filter, "i")] } },
            { 'Motorcraft': { $in: [new RegExp(filter, "i")] } },
            { 'Purolator': { $in: [new RegExp(filter, "i")] } },
            { 'Wix': { $in: [new RegExp(filter, "i")] } },
            { 'Mann': { $in: [new RegExp(filter, "i")] } },
            { 'Sky': { $in: [new RegExp(filter, "i")] } },
            { 'Seineca': { $in: [new RegExp(filter, "i")] } },
            { 'Walmi': { $in: [new RegExp(filter, "i")] } },
            { 'Joe': { $in: [new RegExp(filter, "i")] } },
            { 'Roadstar': { $in: [new RegExp(filter, "i")] } },
            { 'ECA': { $in: [new RegExp(filter, "i")] } }
        ] })

        return res.json({ filters })        

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const getSparkplug = async (req, res) => {
    try{
        const plugs = await Plug.find({ })

        return res.json({ products: plugs })

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const getOil = async (req, res) => {
    try{
        const oils = await Oil.find({ })

        return res.json({ products: oils })

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const getWireset = async (req, res) => {
    try{
        const wiresets = await Wireset.find({ })

        return res.json({ products: wiresets })

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const getBrakeshoe = async (req, res) => {
    try{
        const brakeshoes = await Brakeshoe.find({ })

        return res.json({ products: brakeshoes })

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const createProduct = async (req, res) => {
    try{
        const { interfil, OEM, ACD, Fram, Gonher, Motorcraft,
            Purolator, Wix, Mann, price, product,
            NGK, Champions, Bosh, LS, Roadstar, Wagner, viscosity, presentation,
            oilMake, oilType, filterType, Sky, Seineca, Walmi, Joe, ECA, name } = req.body

        switch(product){
            case 'filter':
                let filter = new Filter({
                    interfil, OEM, ACD, Fram, Gonher, Motorcraft, Purolator,
                    Wix, Mann, price, filterType, Roadstar, Sky, Seineca, Walmi,
                    Joe, ECA
                })

                filter.save((err, newFilterDB) => {
                    console.log(err)
                    if(err){ return res.sendStatus(500) }
                    res.json({ newProduct: newFilterDB })
                })

                break;
                
            case 'sparkPlug':
                let sparkplug = new Plug({
                    NGK, Champions, Bosh, ACD, Motorcraft, price
                })

                sparkplug.save((err, newSparkplugDB) => {
                    if(err){ return res.sendStatus(500) }
                    res.json({ newProduct: newSparkplugDB })
                })

                break;
            case 'wiresets':
                let wireset = new Wireset({
                    NGK, LS, Roadstar, Bosh, price
                })

                wireset.save((err, newWiresetDB) => {
                    if(err){ return res.sendStatus(500) }
                    res.json({ newProduct: newWiresetDB })
                })

                break;
            case 'brakeShoe':

                let brakeshoe = new Brakeshoe({ Wagner, price })

                brakeshoe.save((err, newBrakeshoeDB) => {
                    if(err){ return res.sendStatus(500) }
                    res.json({ newProduct: newBrakeshoeDB })
                })

                break;

            case 'oil':

                let oil = new Oil({ make: oilMake, presentation, viscosity, oilType, price, name })

                oil.save((err, oilDB) => {
                    if(err){ return res.sendStatus(500) }
                    res.json({ newProduct: oilDB })
                })

                break;
        }

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const updateProduct = async (req, res) => {
    try{
        const { interfil, OEM, ACD, Fram, Gonher, Motorcraft,
            Purolator, Wix, Mann, price, product,
            NGK, Champions, Bosh, LS, Roadstar, Wagner, id,
            oilMake, oilType, presentation, viscosity, Sky,
            Seineca, Walmi, Joe, ECA, name } = req.body

        switch(product){
            case 'filter':
                let filter = await Filter.findById(id)

                filter.OEM = OEM
                filter.ACD = ACD
                filter.Fram = Fram
                filter.Gonher = Gonher
                filter.Motorcraft = Motorcraft
                filter.Purolator = Purolator
                filter.Wix = Wix
                filter.Mann = Mann
                filter.price = price
                filter.Sky = Sky
                filter.Seineca = Seineca
                filter.Walmi = Walmi
                filter.Joe = Joe
                filter.Roadstar = Roadstar
                filter.ECA = ECA

                filter.save((err, newFilterDB) => {
                    if(err){ return res.sendStatus(500) }
                    res.json({ newProduct: newFilterDB })
                })

                break;
                
            case 'sparkPlug':

                let sparkPlug = await Plug.findById(id)

                sparkPlug.NGK = NGK
                sparkPlug.ACD = ACD
                sparkPlug.Champions = Champions
                sparkPlug.Bosh = Bosh
                sparkPlug.Motorcraft = Motorcraft
                sparkPlug.price = price

                sparkPlug.save((err, newSparkplugDB) => {
                    if(err){ return res.sendStatus(500) }
                    res.json({ newProduct: newSparkplugDB })
                })

                break;
            case 'wiresets':

                let wireset = await Wireset.findById(id)

                wireset.NGK = NGK
                wireset.LS = LS
                wireset.Roadstar = Roadstar
                wireset.Bosh = Bosh
                wireset.price = price

                wireset.save((err, newWiresetDB) => {
                    if(err){ return res.sendStatus(500) }
                    res.json({ newProduct: newWiresetDB })
                })

                break;

            case 'brakeShoe':

                let brakeshoe = await Brakeshoe.findById(id)

                brakeshoe.Wagner = Wagner
                brakeshoe.price = price

                brakeshoe.save((err, newBrakeshoeDB) => {
                    if(err){ return res.sendStatus(500) }
                    res.json({ newProduct: newBrakeshoeDB })
                })

                break;
            
            case "oil":
                let oil = await Oil.findById(id)

                oil.make = oilMake
                oil.oilType = oilType
                oil.viscosity = viscosity
                oil.presentation = presentation
                oil.price = price
                oil.name = name

                oil.save((err, newOilDB) => {
                    if(err){ return res.sendStatus(500) }
                    res.json({ newProduct: newOilDB })
                })

                break;
        }
        
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const deleteProducts = async (req, res) => {
    try{
        const { type, id } = req.body
        switch(type){
            case 'filter':
                let filter = await Filter.findByIdAndRemove(id)

                res.json({ product: filter })

                break;
                
            case 'sparkPlug':

                let sparkPlug = await Plug.findByIdAndRemove(id)

                res.json({ product: sparkPlug })

                break;
            case 'wiresets':

                let wireset = await Wireset.findByIdAndRemove(id)

                res.json({ product: wireset })

                break;

            case 'brakeShoe':

                let brakeshoe = await Brakeshoe.findByIdAndRemove(id)

                res.json({ product: brakeshoe })

                break;
            
            case "oil":
                let oil = await Oil.findByIdAndRemove(id)

                res.json({ product: oil })

                break;
        }
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

module.exports = {
    getFilters,
    getSparkplug,
    createProduct,
    updateProduct,
    getBrakeshoe,
    getWireset,
    getOil,
    deleteProducts
}