const Filter = require('../db/models/filters')

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

const createFilter = async (req, res) => {
    try{
        const newFilter = req.body

        let filter = new Filter(newFilter)

        filter.save(newFilterDB => {
            res.json({ newFilter: newFilterDB })
        })

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const updateFilter = async (req, res) => {
    try{
        const newFilter = req.body

        console.log(newFilter)

        let filter = await Filter.findById(newFilter.id)

        filter.OEM = newFilter.OEM
        filter.ACD = newFilter.ACD
        filter.Fram = newFilter.Fram
        filter.Gonher = newFilter.Gonher
        filter.Motorcraft = newFilter.Motorcraft
        filter.Purolator = newFilter.Purolator
        filter.Wix = newFilter.Wix
        filter.Mann = newFilter.Mann
        filter.price = newFilter.price

        filter.save((err, newFilterDB) => {
            if(err){ return res.sendStatus(500) }
            res.json({ newFilter: newFilterDB })
        })

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
    createFilter,
    updateFilter,
    getTotal
}