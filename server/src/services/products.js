
const Filter = require('../db/models/filters');
const Brakeshoe = require('../db/models/brakeshoe');
const Plug = require('../db/models/plugs');
const Wireset = require('../db/models/wiresets');
const Coil = require('../db/models/coil');

const createFilterDB = async (filter) => {

    let newFilter = {
        filterType: 'air', 
        price: 100
    }
    
    newFilter.interfil = filter.Interfil
    if(filter.OEM && filter.OEM !== ""){ newFilter.OEM = filter.OEM.toString().split(' / ') }    
    if(filter.Fram && filter.Fram !== ""){ newFilter.Fram = filter.Fram.toString().split(' / ') }    
    if(filter.Purolator && filter.Purolator !== ""){ newFilter.Purolator = filter.Purolator.toString().split(' / ') }
    if(filter.Wix && filter.Wix !== ""){ newFilter.Wix = filter.Wix.toString().split(' / ') }
    if(filter.Mann && filter.Mann !== ""){ newFilter.Mann = filter.Mann.toString().split(' / ') }
    if(filter.ACD && filter.ACD !== ""){ newFilter.ACD = filter.ACD.toString().split(' / ') }
    if(filter.Gonher && filter.Gonher !== ""){ newFilter.Gonher = filter.Gonher.toString().split(' / ') }
    if(filter.Motorcraft && filter.Motorcraft !== ""){ newFilter.Motorcraft = filter.Motorcraft.toString().split(' / ') }
    if(filter.Sky && filter.Sky !== ""){ newFilter.Sky = filter.Sky.toString().split(' / ') }
    if(filter.Seineca && filter.Seineca !== ""){ newFilter.Seineca = filter.Seineca.toString().split(' / ') }
    if(filter.Walmi && filter.Walmi !== ""){ newFilter.Walmi = filter.Walmi.toString().split(' / ') }
    if(filter.Joe && filter.Joe !== ""){ newFilter.Joe = filter.Joe.toString().split(' / ') }
    if(filter.Roadstar && filter.Roadstar !== ""){ newFilter.Roadstar = filter.Roadstar.toString().split(' / ') }
    if(filter.ECA && filter.ECA !== ""){ newFilter.ECA = filter.ECA.toString().split(' / ') }

    return newFilter
}

const checkFilterExist = async (arrayFilters, filterType) => {
    let existFilterDB = true
    for(let i = 0; i < arrayFilters.length; i++){
        let filterDB = await Filter.findOne({ filterType, $or: [
            { 'interfil': arrayFilters[i] },
            { 'OEM': { $in: [arrayFilters[i]] } },
            { 'ACD': { $in: [arrayFilters[i]] } },
            { 'Fram': { $in: [arrayFilters[i]] } },
            { 'Gonher': { $in: [arrayFilters[i]] } },
            { 'Motorcraft': { $in: [arrayFilters[i]] } },
            { 'Purolator': { $in: [arrayFilters[i]] } },
            { 'Wix': { $in: [arrayFilters[i]] } },
            { 'Mann': { $in: [arrayFilters[i]] } },
            { 'MH': { $in: [arrayFilters[i]] } }
        ] })
        if(!filterDB){ existFilterDB = false }
    }
    return existFilterDB
}

const checkBrakeshoeExist = async (brakeshoes) => {
    let existBrakeshoeDB = true
    for(let i = 0; i < brakeshoes.length; i++){
        let brakeshoeDB = await Brakeshoe.findOne({ 'Wagner': brakeshoes[i] })
        if(!brakeshoeDB){ existBrakeshoeDB = false }
    }
    return existBrakeshoeDB
}

const checkSparkplugExist = async (sparkplugs) => {
    let existSparkplugDB = true
    for(let i = 0; i < sparkplugs.length; i++){
        let sparkplugDB = await Plug.findOne({ $or: [
            { 'NGK': { $in: [sparkplugs[i]] } },
            { 'ACD': { $in: [sparkplugs[i]] } },
            { 'Champions': { $in: [sparkplugs[i]] } },
            { 'Bosh': { $in: [sparkplugs[i]] } },
            { 'Motorcraft': { $in: [sparkplugs[i]] } }
        ] })
        if(!sparkplugDB){ existSparkplugDB = false }
    }
    return existSparkplugDB
}

const checkWiresetsExist = async (wiresets) => {
    let existWiresetDB = true
    for(let i = 0; i < wiresets.length; i++){
        let wiresetDB = await Wireset.findOne({ $or: [
            { 'NGK': { $in: [wiresets[i]] } },
            { 'LS': { $in: [wiresets[i]] } },
            { 'Roadstar': { $in: [wiresets[i]] } },
            { 'Bosh': { $in: [wiresets[i]] } }
        ] })
        if(!wiresetDB){ existWiresetDB = false }
    }
    return existWiresetDB
}

const checkCoilsExist = async (coils) => {
    let existCoilDB = true
    for(let i = 0; i < coils.length; i++){
        let coilDB = await Coil.findOne({ $or: [
            { 'Injecth': { $in: [coils[i]] } },
            { 'Kem': { $in: [coils[i]] } }
        ] })
        if(!coilDB){ existCoilDB = false }
    }
    return existCoilDB
}

const checkProductsExistMiddleware = async (req, res, next) => {
    const newCar = req.body

    let existAirFilterDB = await checkFilterExist(newCar.airFilter, 'air')
    let existOilFilterDB = await checkFilterExist(newCar.oilFilter, 'oil')
    let existFuelFilterDB = await checkFilterExist(newCar.fuelFilter, 'fuel')
    let existCabineFilterDB = await checkFilterExist(newCar.cabineFilter, 'cabine')

    if(!existAirFilterDB || !existOilFilterDB || !existFuelFilterDB || !existCabineFilterDB){ return res.status(400).send('Alguno de los filtros introducidos no existen') }

    let existBrakeshoeFront = await checkBrakeshoeExist(newCar.brakeShoeFront)
    let existBrakeshoeBack = await checkBrakeshoeExist(newCar.brakeShoeBack)

    if(!existBrakeshoeFront || !existBrakeshoeBack){ return res.status(400).send('Alguna de las balatas introducidas no existen') }

    let existSparkplugs = await checkSparkplugExist(newCar.sparkPlug)

    if(!existSparkplugs){ return res.status(400).send('Alguna de las bujías introducidas no existen') }

    let existWiresets = await checkWiresetsExist(newCar.wiresets)

    if(!existWiresets){ return res.status(400).send('Alguna de las juegos de cables introducidos no existen') }

    let existCoils = await checkCoilsExist(newCar.coil)

    if(!existCoils){ return res.status(400).send('Alguna de las bobinas no existen') }


    next()
}

module.exports = {
    createFilterDB,
    checkProductsExistMiddleware
}