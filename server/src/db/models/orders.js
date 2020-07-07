const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    car: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'carros'
    },
    filters:{
        airFilter: { type: String },
        fuelFilter: { type: String },
        oilFilter: { type: String },
        cabineFilter: { type: String }
    },
    carYear: {
        required: true,
        type: String
    },
    note: {        
        type: String
    },
    oil: {
        oilRequired: {
            required: true,
            type: String
        },
        oilType: {
            required: true,
            type: String
        },
        oilLts: {
            required: true,
            type: String
        }
    },
    cleanInj: {
        required: true,
        type: String
    },
    cleanAB: {
        required: true,
        type: String
    },
    plugs: {
        required: true,
        type: String
    },
    brakeshoe: {
        required: true,
        type: String
    },
    coil: {
        required: true,
        type: String
    },
    antifreeze: {
        required: true,
        type: String
    },
    transmission: {
        required: true,
        type: String
    },
    idOrder: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('orders', orderSchema)