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
        type: String
    },
    year: [{
        required: true,
        type: Number,
    }],
    airFilter: { type: Array, default: [] },
    oilFilter: { type: Array, default: [] },
    fuelFilter: { type: Array, default: [] },
    cabineFilter: { type: Array, default: [] },
    sparkPlug: { type: Array, default: [] },
    wiresets: { type: Array, default: [] },
    brakeShoeFront: { type: Array, default: [] },
    brakeShoeBack: { type: Array, default: [] },
    coil: { type: Array, default: [] }
})

module.exports = mongoose.model('carros', carSchema)