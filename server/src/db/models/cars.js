const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carSchema = new Schema({
    make: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'marcas'
    },
    cylinder: {
        required: true,
        type: String
    },
    model: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'modelos'
    },
    motor: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'motores'
    },
    yearFrom: {
        required: true,
        type: Number,
    },
    yearTo: {
        required: true,
        type: Number,
    },
    airFilter: { type: Array },
    oilFilter: { type: Array },
    fuelFilter: { type: Array }
})

module.exports = mongoose.model('carros', carSchema)