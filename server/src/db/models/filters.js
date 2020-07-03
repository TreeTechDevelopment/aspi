const mongoose = require('mongoose')
const Schema = mongoose.Schema

const filterSchema = new Schema({
    filterType: {
        type: String,
        required: true
    },
    interfill: {
        type: String,
        required: true,
        unique: true
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
    MH: {
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