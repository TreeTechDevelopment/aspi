const mongoose = require('mongoose')
const Schema = mongoose.Schema

const filterSchema = new Schema({
    filterType: {
        type: String,
        required: true
    },
    interfil: {
        type: String,
        default: ''
    },
    OEM: {
        type: Array,
        required: true,
        default: []
    },
    ACD: {
        type: Array,
        required: true,
        default: []
    }, 
    Fram: {
        type: Array,
        required: true,
        default: []
    },
    Gonher: {
        type: Array,
        required: true,
        default: []
    },
    Motorcraft: {
        type: Array,
        required: true,
        default: []
    },
    Purolator: {
        type: Array,
        required: true,
        default: []
    },
    Wix: {
        type: Array,
        required: true,
        default: []
    },
    Mann: {
        type: Array,
        required: true,
        default: []
    },
    Sky: {
        type: Array,
        required: true,
        default: []
    },
    Seineca: {
        type: Array,
        required: true,
        default: []
    },
    Walmi: {
        type: Array,
        required: true,
        default: []
    },
    Joe: {
        type: Array,
        required: true,
        default: []
    },
    Roadstar: {
        type: Array,
        required: true,
        default: []
    },
    ECA: {
        type: Array,
        required: true,
        default: []
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('filters', filterSchema)