const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    car: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'carros'
    },
    carYear: {
        required: true,
        type: String
    },
    note: { type: String },
    cleanInj: {
        required: true,
        type: String
    },
    cleanAB: {
        required: true,
        type: String
    },
    airFilter: {
        required: true,
        type: String
    },
    cabineFilter: {
        required: true,
        type: String
    },
    oilFilter: {
        required: true,
        type: String
    },
    fuelFilter: {
        required: true,
        type: String
    },
    sparkplug: {
        required: true,
        type: String
    },
    wiresets: {
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
    rectifyDisk: {
        required: true,
        type: String
    },
    brakeshoeBack: {
        required: true,
        type: String
    },
    brakeshoeFront: {
        required: true,
        type: String
    },
    oil: {
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
    },
    products: {
        type: Array,
        required: true,
        default: []
    }
})

module.exports = mongoose.model('orders', orderSchema)