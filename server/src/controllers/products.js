const Filter = require('../db/models/filters')
const Plug = require('../db/models/plugs')
const Wireset = require('../db/models/wiresets')
const Brakeshoe = require('../db/models/brakeshoe')

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
            { 'MH': { $in: [new RegExp(filter, "i")] } }
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
            NGK, Champions, Bosh, LS, Roadstar, Wagner } = req.body

        switch(product){
            case 'filter':
                let filter = new Filter({
                    interfil, OEM, ACD, Fram, Gonher, Motorcraft, Purolator,
                    Wix, Mann, price
                })

                filter.save((err, newFilterDB) => {
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
            NGK, Champions, Bosh, LS, Roadstar, Wagner, id } = req.body

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
        }
        
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const getTotal = async (req, res) => {
    try{

        const { airFilter, oilFilter, fuelFilter, cabineFilter } = req.query

        let airFilterDB 
        let oilFilterDB 
        let fuelFilterDB
        let ok = true
        let total = 0

        if(airFilter){ 
            airFilterDB = await Filter.findOne({ filterType: 'air', $or: [
                { 'interfil': { $regex : new RegExp(airFilter, "i") } },
                { 'OEM': { $in: [new RegExp(airFilter, "i")] } },
                { 'ACD': { $in: [new RegExp(airFilter, "i")] } },
                { 'Fram': { $in: [new RegExp(airFilter, "i")] } },
                { 'Gonher': { $in: [new RegExp(airFilter, "i")] } },
                { 'Motorcraft': { $in: [new RegExp(airFilter, "i")] } },
                { 'Purolator': { $in: [new RegExp(airFilter, "i")] } },
                { 'Wix': { $in: [new RegExp(airFilter, "i")] } },
                { 'Mann': { $in: [new RegExp(airFilter, "i")] } },
                { 'MH': { $in: [new RegExp(airFilter, "i")] } }
            ] })
    
            if(airFilterDB){ total += airFilterDB.price }
            else{ ok = false }
        }
        if(oilFilter){ 
            oilFilterDB = await Filter.findOne({ filterType: 'oil', $or: [
                { 'interfil': { $regex : new RegExp(oilFilter, "i") } },
                { 'OEM': { $in: [new RegExp(oilFilter, "i")] } },
                { 'ACD': { $in: [new RegExp(oilFilter, "i")] } },
                { 'Fram': { $in: [new RegExp(oilFilter, "i")] } },
                { 'Gonher': { $in: [new RegExp(oilFilter, "i")] } },
                { 'Motorcraft': { $in: [new RegExp(oilFilter, "i")] } },
                { 'Purolator': { $in: [new RegExp(oilFilter, "i")] } },
                { 'Wix': { $in: [new RegExp(oilFilter, "i")] } },
                { 'Mann': { $in: [new RegExp(oilFilter, "i")] } },
                { 'MH': { $in: [new RegExp(oilFilter, "i")] } }
            ] })
            if(oilFilterDB){ total += oilFilterDB.price }
            else{ ok = false }
        }
        if(fuelFilter){ 
            fuelFilterDB = await Filter.findOne({ filterType: 'fuel', $or: [
                { 'interfil': { $regex : new RegExp(fuelFilter, "i") } },
                { 'OEM': { $in: [new RegExp(fuelFilter, "i")] } },
                { 'ACD': { $in: [new RegExp(fuelFilter, "i")] } },
                { 'Fram': { $in: [new RegExp(fuelFilter, "i")] } },
                { 'Gonher': { $in: [new RegExp(fuelFilter, "i")] } },
                { 'Motorcraft': { $in: [new RegExp(fuelFilter, "i")] } },
                { 'Purolator': { $in: [new RegExp(fuelFilter, "i")] } },
                { 'Wix': { $in: [new RegExp(fuelFilter, "i")] } },
                { 'Mann': { $in: [new RegExp(fuelFilter, "i")] } },
                { 'MH': { $in: [new RegExp(fuelFilter, "i")] } }
            ] })
            if(fuelFilterDB){ total += fuelFilterDB.price }
            else{ ok = false }
        }
        if(cabineFilter){ 
            cabineFilterDB = await Filter.findOne({ filterType: 'cabine', $or: [
                { 'interfil': { $regex : new RegExp(cabineFilter, "i") } },
                { 'OEM': { $in: [new RegExp(cabineFilter, "i")] } },
                { 'ACD': { $in: [new RegExp(cabineFilter, "i")] } },
                { 'Fram': { $in: [new RegExp(cabineFilter, "i")] } },
                { 'Gonher': { $in: [new RegExp(cabineFilter, "i")] } },
                { 'Motorcraft': { $in: [new RegExp(cabineFilter, "i")] } },
                { 'Purolator': { $in: [new RegExp(cabineFilter, "i")] } },
                { 'Wix': { $in: [new RegExp(cabineFilter, "i")] } },
                { 'Mann': { $in: [new RegExp(cabineFilter, "i")] } },
                { 'MH': { $in: [new RegExp(cabineFilter, "i")] } }
            ] })
            if(cabineFilterDB){ total += cabineFilterDB.price }
            else{ ok = false }
        }

        res.json({ ok, total })

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
    getTotal,
    getBrakeshoe,
    getWireset
}