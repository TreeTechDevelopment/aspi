
const Make = require('../db/models/marcas');
const Model = require('../db/models/modelos');

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

module.exports = {
    createFilterDB
}