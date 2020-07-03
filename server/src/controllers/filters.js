const Filter = require('../db/models/filters')

const getFilters = async (req, res) => {
    try{
        const { type, filter } = req.query
        
        if(type){            
            const filters = await Filter.find({ filterType: type })

            return res.json({ filters })
        }        

        let filters = await Filter.find({ $or: [
            { 'interfill': { $regex : new RegExp(filter, "i") } },
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
        
        const { airFilter, oilFilter, fuelFilter } = req.query

        const airFilterDB = await Filter.findOne({ filterType: 'air', interfill: airFilter })
        const oilFilterDB = await Filter.findOne({ filterType: 'oil', interfill: oilFilter })
        const fuelFilterDB = await Filter.findOne({ filterType: 'fuel', interfill: fuelFilter })

        let ok = true
        let total = 0

        if(airFilterDB){ total += airFilterDB.price }
        else{ ok = false }

        if(oilFilterDB){ total += oilFilterDB.price }
        else{ ok = false }

        if(fuelFilterDB){ total += fuelFilterDB.price }
        else{ ok = false }

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