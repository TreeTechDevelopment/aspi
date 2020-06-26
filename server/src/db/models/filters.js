const mongoose = require('mongoose')
const Schema = mongoose.Schema

const filterSchema = new Schema({
    interfill: {
        type: String,
        required: true,
        unique: true
    },
    OEM: {
        type: Array,
        required: true
    },
    ACD: {
        type: Array,
        required: true
    },
    Fram: {
        type: Array,
        required: true
    },
    Gonher: {
        type: Array,
        required: true
    },
    Motorcraft: {
        type: Array,
        required: true
    },
    Purolator: {
        type: Array,
        required: true
    },
    Wix: {
        type: Array,
        required: true
    },
    Mann: {
        type: Array,
        required: true
    },
    MH: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('filters', filterSchema)