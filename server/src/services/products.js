
const Filter = require('../db/models/filters');

const createFilterDB = async (filter) => {

    let newFilter = {
        filterType: 'cabine',
        price: 100
    }
    
    newFilter.interfil = filter.Interfil
    if(filter.OEM !== ""){ newFilter.OEM = filter.OEM.split(' / ') }    
    if(filter.Fram !== ""){ newFilter.Fram = filter.Fram.split(' / ') }    
    if(filter.Purolator !== ""){ newFilter.Purolator = filter.Purolator.split(' / ') }
    if(filter.Wix !== ""){ newFilter.Wix = filter.Wix.split(' / ') }
    if(filter.Mann !== ""){ newFilter.Mann = filter.Mann.split(' / ') }

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

module.exports = {
    createFilterDB,
    checkFilterExist
}