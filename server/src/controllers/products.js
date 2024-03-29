const Filter = require('../db/models/filters')
const Plug = require('../db/models/plugs')
const Wireset = require('../db/models/wiresets')
const Brakeshoe = require('../db/models/brakeshoe')
const Oil = require('../db/models/oil')
const Antifreeze = require('../db/models/antifreeze')
const Coil = require('../db/models/coil')

const getFilters = async (req, res) => {
    try{
        const { type, filter, limit, page } = req.query
                
        if(type){            
            let filters = []
            if(limit === "all"){ filters = await Filter.find({ filterType: type }) }
            else{ filters = await Filter.find({ filterType: type }).limit(Number(limit)).skip(Number(limit) * Number(page)) }
            const count = await Filter.find({ filterType: type }).countDocuments()

            return res.json({ products: filters, count })
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

        const { filter} = req.query

        if(filter){
            const sparkplugs = await Plug.find({
                $or: [
                    { 'NGK': { $in: [new RegExp(filter, "i")] } },
                    { 'Champions': { $in: [new RegExp(filter, "i")] } },
                    { 'Bosh': { $in: [new RegExp(filter, "i")] } },
                    { 'Motorcraft': { $in: [new RegExp(filter, "i")] } },
                    { 'ACD': { $in: [new RegExp(filter, "i")] } }
                ]
            })

            return res.json({ filters: sparkplugs })  
        }

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

const getAntifreeze = async (req, res) => {
    try{
        const antifreezes = await Antifreeze.find({ })

        return res.json({ products: antifreezes })

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const getCoil = async (req, res) => {
    try{

        const { filter} = req.query

        if(filter){
            const coils = await Coil.find({
                $or: [
                    { 'Injecth': { $in: [new RegExp(filter, "i")] } },
                    { 'Kem': { $in: [new RegExp(filter, "i")] } }
                ]
            })

            return res.json({ filters: coils })  
        }

        const coils = await Coil.find({ })

        return res.json({ products: coils })

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const getWireset = async (req, res) => {
    try{

        const { filter} = req.query

        if(filter){
            const wiresets = await Plug.find({
                $or: [
                    { 'NGK': { $in: [new RegExp(filter, "i")] } },
                    { 'LS': { $in: [new RegExp(filter, "i")] } },
                    { 'Bosh': { $in: [new RegExp(filter, "i")] } },
                    { 'Roadstar': { $in: [new RegExp(filter, "i")] } }
                ]
            })

            return res.json({ filters: wiresets })  
        }

        const wiresets = await Wireset.find({ })

        return res.json({ products: wiresets })

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const getBrakeshoe = async (req, res) => {
    try{

        const { filter} = req.query

        if(filter){
            const brakeshoes = await Plug.find({ 'Wagner': { $in: [new RegExp(filter, "i")] }})

            return res.json({ filters: brakeshoes })  
        }

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
            oilMake, oilType, filterType, Sky, Seineca, Walmi, Joe, ECA, name, antifreezeMake,
            antifreezeType, antifreezePresentation, specification, Injecth, Kem } = req.body

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

            case 'antifreeze':

                let antifreeze = new Antifreeze({ antifreezeMake, antifreezeType, antifreezePresentation, specification, price })

                antifreeze.save((err, antifreezeDB) => {
                    if(err){ return res.sendStatus(500) }
                    res.json({ newProduct: antifreezeDB })
                })

                break;

            case 'coil':

                let coil = new Coil({ Injecth, Kem, price })

                coil.save((err, coilDB) => {
                    if(err){ return res.sendStatus(500) }
                    res.json({ newProduct: coilDB })
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
            Seineca, Walmi, Joe, ECA, name, antifreezeMake,
            antifreezeType, antifreezePresentation, specification, Injecth, Kem } = req.body

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

            case "antifreeze":
                let antifreeze = await Antifreeze.findById(id)

                antifreeze.antifreezeMake = antifreezeMake
                antifreeze.antifreezeType = antifreezeType
                antifreeze.antifreezePresentation = antifreezePresentation
                antifreeze.specification = specification
                antifreeze.price = price

                antifreeze.save((err, newAntifreeze) => {
                    if(err){ return res.sendStatus(500) }
                    res.json({ newProduct: newAntifreeze })
                })

                break;

             case "coil":
                let coil = await Coil.findById(id)

                coil.Injecth = Injecth
                coil.Kem = Kem
                coil.price = price

                coil.save((err, newCoil) => {
                    if(err){ return res.sendStatus(500) }
                    res.json({ newProduct: newCoil })
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

            case "antifreeze":
                let antifreeze = await Antifreeze.findByIdAndRemove(id)

                res.json({ product: antifreeze })

                break;

            case "coil":
                let coil = await Coil.findByIdAndRemove(id)

                res.json({ product: coil })

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
    deleteProducts,
    getAntifreeze,
    getCoil
}